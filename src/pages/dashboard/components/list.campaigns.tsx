import { Button, Col, Container } from 'react-bootstrap';
import DataTable, { PaginationOptions, TableColumn } from 'react-data-table-component';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { CampaignEntity, CampaignStatusEnum } from '../../../common/types/entities/campagin.entity';
import { timestampToDate } from '../../../common/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { ModalUIComponent } from '../../../ui/modal.ui';
import { ButtonUI } from '../../../ui/button.ui';
import { SizeButtonEnum } from '../../../common/types/interface/ui/buttonProps.interface';
import { deleteCampaignApi } from '../../../common/services/api.service';
import { setAlert } from '../../../redux/errorSlice';
import { setUser } from '../../../redux/userSlice';

export class AddCampaignState {
  id: number;
  name: string;
  endDate: string;
  budget: string;
  dailyBudget: string;
  status: CampaignStatusEnum;
  createdBy: string;
  createdAt: string;
}

export const MyCampaigns = (): JSX.Element => {
  const campaigns: CampaignEntity[] = useSelector(
    (state: RootState) => state?.user?.user.companies[0].campaigns
  );
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);

  const [modal, setModal] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<AddCampaignState>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName: string = useSelector((state: RootState) => state?.user?.user.name);

  const [dataTable, setDataTable] = useState<AddCampaignState[]>(
    campaigns &&
      campaigns.map((campaign) => {
        return {
          id: campaign.id,
          name: campaign.name,
          endDate: timestampToDate(campaign.endDate),
          budget: campaign.budget.toString(),
          dailyBudget: campaign.dailyBudget.toString(),
          createdBy: userName,
          createdAt: timestampToDate(campaign.createdAt),
          status: campaign.status
        };
      })
  );

  const handleDeleteModal = (row: AddCampaignState) => {
    setModal(true);

    setCampaignToDelete(row);
  };

  const deleteCampaign = async () => {
    try {
      const response = await deleteCampaignApi(campaignToDelete.id);

      dispatch(setAlert({ message: 'הקמפיין נמחק בהצלחה', type: 'success' }));

      const companies = user.companies.map((company) => {
        const campaigns = company.campaigns.filter(({ id }) => id !== campaignToDelete.id);
        return {
          ...company,
          campaigns: campaigns
        };
      });

      setDataTable(dataTable.filter(({ id }) => id !== campaignToDelete.id));
      dispatch(setUser({ ...user, companies: companies, rememberMe: true }));

      setModal(false);
    } catch (error) {
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };

  const columns: TableColumn<AddCampaignState>[] = [
    {
      name: 'שם הקמפיין',
      selector: (row) => row.name
    },
    {
      name: 'תאריך סיום',
      selector: (row) => row.endDate
    },
    {
      name: 'תקציב',
      selector: (row) => row.budget
    },
    {
      name: 'תקציב יומי',
      selector: (row) => row.dailyBudget
    },
    {
      name: 'נוצר על ידי',
      selector: (row) => row.createdBy
    },
    {
      name: 'נוצר בתאריך',
      selector: (row) => row.createdAt
    },
    {
      name: 'סטטוס',
      selector: (row) => row.status
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <div className="d-flex justify-content-between col-md-6">
            <PencilSquare onClick={() => handleEdit(row)} />
            <TrashFill color="red" onClick={() => handleDeleteModal(row)} />
          </div>
        </>
      ),
      button: true,
      width: '80px'
    }
  ];

  const handleEdit = (campaign: AddCampaignState) => {
    navigate(`/dashboard/edit-campaign/${campaign.id}`, {
      state: {
        campaign
      }
    });
  };

  // Define pagination options
  const paginationOptions: PaginationOptions = {
    rowsPerPageText: 'Rows per page:',
    rangeSeparatorText: 'of',
    noRowsPerPage: false,
    selectAllRowsItem: false,
    selectAllRowsItemText: 'All'
  };

  return (
    <>
      <Container
        className="d-flex flex-column  justify-content-center  align-items-center p-1"
        fluid
      >
        <ModalUIComponent show={modal} onHide={() => setModal(false)} title={'מחיקת קמפיין'}>
          <p>האם אתה בטוח שברצונך למחוק את {campaignToDelete?.name} ? </p>

          <div className="d-flex justify-content-end m-3">
            <Button
              size={SizeButtonEnum.sm}
              onClick={() => deleteCampaign()}
              className="btn-danger btn"
            >
              מחק
            </Button>
            <div className="p-2"></div>

            <Button
              size={SizeButtonEnum.sm}
              onClick={() => setModal(false)}
              className="btn-warning btn"
            >
              בטל
            </Button>
          </div>
        </ModalUIComponent>
        <Col
          md={9}
          sm={9}
          className="d-flex flex-column justify-content-center  align-items-center bg-light m-1"
        >
          <DataTable
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 8, 10]}
            paginationComponentOptions={paginationOptions}
            columns={columns}
            data={dataTable}
            fixedHeader
            responsive={true}
          />
        </Col>
      </Container>
    </>
  );
};
