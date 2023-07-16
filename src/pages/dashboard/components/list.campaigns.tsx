import { Button, Col, Container, Form } from 'react-bootstrap';
import DataTable, { PaginationOptions, TableColumn } from 'react-data-table-component';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { CampaignEntity } from '../../../common/types/entities/campagin.entity';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, TrashFill, DatabaseAdd } from 'react-bootstrap-icons';
import { ModalUIComponent } from '../../../ui/modal.ui';
import { SizeButtonEnum } from '../../../common/types/interface/ui/buttonProps.interface';
import { ApiAddCampaign, deleteCampaignApi } from '../../../common/services/api.service';
import { setAlert } from '../../../redux/errorSlice';
import { setUser } from '../../../redux/userSlice';
import { FilterDateEnum, FilterDateEnumKeys } from '../../../common/types/enum/campaign.enum';
import { MyCampaignState } from '../../../common/types/interface/state/dashboard.interface';

/**
 * A functional component that displays a list of campaigns for a user. The component
 * retrieves the list of campaigns from the Redux store and displays them in a DataTable.
 * The user can edit or delete campaigns from the list. The component also includes a
 * modal for confirming the deletion of a campaign.
 * @returns {JSX.Element} - A JSX element that displays the list of campaigns.
 */

export const MyCampaigns = (): JSX.Element => {
  const campaigns: CampaignEntity[] = useSelector(
    (state: RootState) => state?.user?.user?.company?.campaigns
  );
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const companyId: number = user?.company?.id;
  const [modal, setModal] = useState<boolean>(false);
  const [modalDupli, setModalDupli] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<MyCampaignState>(null);
  const [campaignToDupli, setCampaignToDupli] = useState<MyCampaignState>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState<FilterDateEnum | string>('');
  const userName: string = useSelector((state: RootState) => state?.user?.user.name);

  const [dataTable, setDataTable] = useState<MyCampaignState[]>(
    campaigns &&
    campaigns.map((campaign) => {
      return {
        id: campaign.id,
        name: campaign.name,
        endDate: new Date(campaign.endDate).toLocaleDateString(),
        startDate: new Date(campaign.startDate).toLocaleDateString(),
        budget: campaign.budget.toString(),
        dailyBudget: campaign.dailyBudget.toString(),
        createdBy: userName,
        createdAt: new Date(campaign.createdAt).toLocaleDateString(),
        status: campaign.status,
        companyId: companyId,
        target: campaign.target
      };
    })
  );

  // useEffect(() => {}, [dataTable]);

  /**
   * Handles the deletion of a campaign by displaying a modal and setting the campaign to be deleted.
   * @param {MyCampaignState} row - The campaign to be deleted.
   * @returns None
   */
  const handleDeleteModal = (row: MyCampaignState) => {
    setModal(true);

    setCampaignToDelete(row);
  };

  const handleDuplicateModal = (row: MyCampaignState) => {
    setModalDupli(true);

    setCampaignToDupli(row);
  };

  /**
   * Handles the change event of a select element and filters the data table based on the selected value.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event object.
   * @returns None
   */
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: FilterDateEnum = event.target.value as unknown as FilterDateEnum;

    //in case of ---
    if (!FilterDateEnum[value]) return;

    const resultDate = new Date();

    resultDate.setDate(resultDate.getDate() - FilterDateEnumKeys[value]);

    resultDate.setHours(0, 0, 0, 0);

    var dataFiltered: MyCampaignState[] = dataTable.filter(
      (row) => new Date(row.createdAt).getTime() > resultDate.getTime()
    );

    if (dataFiltered.length) {
      setDataTable(dataFiltered);
      setDateFilterValue(FilterDateEnum[value]);
    } else {
      alert('אין רשומות התואמות את החיפוש שלך');
    }
  };

  /**
   * Deletes a campaign from the server and updates the user's data accordingly.
   * @returns None
   * @throws {Error} If there is an error deleting the campaign or updating the user's data.
   */
  const deleteCampaign = async () => {
    try {
      const response = await deleteCampaignApi(campaignToDelete.id);

      dispatch(setAlert({ message: 'הקמפיין נמחק בהצלחה', type: 'success' }));

      const company: CompanyEntity = {
        ...user.company,
        campaigns: user.company.campaigns.filter(({ id }) => id !== campaignToDelete.id)
      };

      setDataTable(dataTable.filter(({ id }) => id !== campaignToDelete.id));
      dispatch(setUser({ ...user, company, rememberMe: true }));

      setModal(false);
    } catch (error) {
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };

  const handleDuplicate = async () => {
    try {
      const campaignPayload: Omit<CampaignEntity, 'id'> = {
        budget: parseInt(campaignToDupli.budget),
        companyId: campaignToDupli.companyId,
        createdBy: user.id,
        dailyBudget: parseInt(campaignToDupli.dailyBudget),
        endDate: new Date(campaignToDupli.endDate).getTime(),
        startDate: new Date(campaignToDupli.startDate).getTime(),
        name: campaignToDupli.name,
        status: campaignToDupli.status,
        target: campaignToDupli.target
      };

      const campaignCreated: CampaignEntity = await ApiAddCampaign(campaignPayload);

      const newCampaigns = [
        ...dataTable,
        {
          id: campaignCreated.id,
          name: campaignCreated.name,
          endDate: new Date(campaignCreated.endDate).toLocaleDateString(),
          startDate: new Date(campaignCreated.startDate).toLocaleDateString(),
          budget: campaignCreated.budget.toString(),
          dailyBudget: campaignCreated.dailyBudget.toString(),
          createdBy: userName,
          createdAt: new Date(campaignCreated.createdAt).toLocaleDateString(),
          status: campaignCreated.status,
          target: campaignCreated.target,
          companyId: companyId
        }
      ];

      setDataTable(newCampaigns);

      if (campaignCreated) {
        const company: CompanyEntity = {
          ...user.company,
          campaigns: [...user?.company?.campaigns, campaignCreated]
        };

        dispatch(setUser({ ...user, company, rememberMe: true }));

        dispatch(setAlert({ message: 'הקמפיין שוכפל בהצלחה', type: 'success' }));

        setModalDupli(false);
      }
    } catch (error) {
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };

  const columns: TableColumn<MyCampaignState>[] = [
    {
      name: 'שם הקמפיין',
      selector: (row) => row.name
    },
    {
      name: 'מטרת הקמפיין',
      selector: (row) => row.target
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
      name: (
        <div className="d-flex flex-column">
          נוצר בתאריך
          <select name="status" onChange={handleSelectChange}>
            <option>---</option>
            {Object.values(FilterDateEnum).map((option, index) => (
              <option key={option} value={Object.keys(FilterDateEnum)[index]}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ),
      selector: (row) => row.createdAt
    },
    {
      name: 'תאריך התחלה',
      selector: (row) => row.startDate
    },
    {
      name: 'תאריך סיום',
      selector: (row) => row.endDate
    },
    {
      name: 'סטטוס',
      selector: (row) => row.status
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <div className="d-flex justify-content-between col-md-7">
            <PencilSquare onClick={() => handleEdit(row)} />
            <TrashFill color="red" onClick={() => handleDeleteModal(row)} />
            <DatabaseAdd color="blue" onClick={() => handleDuplicateModal(row)} />
          </div>
        </>
      ),
      button: true,
      width: '80px'
    }
  ];

  const handleEdit = (campaign: MyCampaignState) => {
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust the breakpoint according to your needs
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px' // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px'
      }
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px'
      }
    }
  };

  return (
    <>
      <Container className="list-campaign d-flex flex-column justify-content-center  align-items-center p-1" fluid >
        <ModalUIComponent show={modal} onHide={() => setModal(false)} title={'מחיקת קמפיין'}>
          <p>האם אתה בטוח שברצונך למחוק את {campaignToDelete?.name} ? </p>
          <div className="d-flex justify-content-end m-3">
            {/* <Button size={SizeButtonEnum.sm} onClick={() => deleteCampaign()} className="btn-danger btn" >מחק</Button> */}
            <button id='btn-ui' onClick={() => deleteCampaign()} className="btn-danger btn">מחק</button>
            <div className="p-2"></div>
            {/* <Button size={SizeButtonEnum.sm} onClick={() => setModal(false)} className="btn-warning btn">בטל</Button> */}
            <button id='btn-ui' onClick={() => setModal(false)} className="btn-warning btn">בטל</button>
          </div>
        </ModalUIComponent>

        <ModalUIComponent show={modalDupli} onHide={() => setModalDupli(false)} title={'מחיקת קמפיין'} >
          <p>האם אתה בטוח שברצונך לשכפל את {campaignToDelete?.name} ? </p>
          <div className="d-flex justify-content-end m-3">
            {/* <Button size={SizeButtonEnum.sm} onClick={() => handleDuplicate()} className="btn-danger btn">שכפל</Button> */}
            <button id='btn-ui' onClick={() => handleDuplicate()} className="btn-danger btn">שכפל</button>
            <div className="p-2"></div>
            <button id='btn-ui' onClick={() => setModalDupli(false)} className="btn-warning btn">בטל</button>
            {/* <Button size={SizeButtonEnum.sm} onClick={() => setModalDupli(false)} className="btn-warning btn" >בטל</Button> */}
          </div>
        </ModalUIComponent>

        <Col md={10} className="d-flex justify-content-start">
          <div className="d-flex  col-md-3 justify-content-between">
            <h3 className="text-light ml-2"> רשימת הקמפיינים</h3>
            {dateFilterValue ? (<h6 className="text-light align-self-center mr-3">({dateFilterValue})</h6>) : null}
          </div>
        </Col>

        <Col
          md={10} sm={12} className="d-flex flex-column justify-content-center  align-items-center bg-light m-1 p-2" style={{ overflow: 'auto' }}>
          <DataTable customStyles={customStyles} pagination paginationPerPage={10} paginationRowsPerPageOptions={[5, 8, 10]}
            paginationComponentOptions={paginationOptions} columns={columns} data={dataTable} fixedHeader responsive={true} striped highlightOnHover />
        </Col>
      </Container>
    </>
  );
};