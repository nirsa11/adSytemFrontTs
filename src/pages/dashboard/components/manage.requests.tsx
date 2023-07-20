import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserEntity } from '../../../common/types/entities/user.entity';
import DataTable, { TableColumn } from 'react-data-table-component';
import { CheckLg, Trash3, XLg } from 'react-bootstrap-icons';
import { BussinesAgencyRequestState } from '../../../common/types/interface/state/dashboard.interface';
import { ApiGetAgencyRequests, ApiGetBusinessRequests } from '../../../common/services/api.service';
import { CompanyTypeEnum } from '../../../common/types/entities/company.entity';
import { RequestEntity } from '../../../common/types/entities/request.entity';
// import { UserRoleEnum } from '../../../common/types/enum/userRole.enum';

/**
 * A component that allows a business owner to send a request to an advertising company to manage their campaigns.
 * Likewise, the advertising company can also submit an application for managing a specific business.
 * It also display all sent and received requests.
 * @returns {JSX.Element} - A request input and requests table.
 */

export const ManageRequestsPage = (): JSX.Element => {
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const managedBy = user?.currCompany?.name
  // var managedBy = user.company.managedBy
  const [companyCode, setCompanyCode] = useState('');
  const [currCompany, setCurrCompany] = useState('');
  const [requests, setRequests] = useState<RequestEntity[]>([])
  const [dataTable, setDataTable] = useState<BussinesAgencyRequestState[]>([]);

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

  const columns: TableColumn<BussinesAgencyRequestState>[] = [
    {
      name: 'שולח',
      selector: (row) => row.sender
    },
    {
      name: 'מקבל',
      selector: (row) => row.target
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
            <Trash3 color="gray" />
            <XLg color="red" onClick={(ev) => (handleLinkingRequestAction(ev, false))} />
            <CheckLg color="green" onClick={(ev) => (handleLinkingRequestAction(ev, true))} />
          </div>
        </>
      ),
      button: true,
      width: '80px'
    }
  ];

  useEffect(() => {
    console.log(user)
    // This useEffect hook will run whenever 'requests' state changes
    // It will update 'dataTable' based on the new 'requests' data
    setDataTable(
      requests.map((request) => {
        return {
          id: request.id,
          sender: request.sender === CompanyTypeEnum.BUSINESS ? request.businessId : request.agencyId,
          status: request.status,
          target: request.sender === CompanyTypeEnum.BUSINESS ? request.agencyId : request.businessId,
        };
      })
    );
  }, [requests]);

  useEffect(() => {
    // This useEffect hook will run once on component mount 
    // It will fetch the initial requests data
    (async () => {
      await getRequests();
    })();
  }, []);

  const getRequests = () => {
    try {
      if (user) {
        user.userRoles.map(async (userRole) => {
          if (userRole.company.type === CompanyTypeEnum.BUSINESS) {
            const response = await ApiGetBusinessRequests(userRole.company.id);
            setRequests(response.data);
          } else {
            const response = await ApiGetAgencyRequests(userRole.company.id);
            setRequests(response.data);
          }
        })
      }
    } catch (error) {
      console.log(error);
    };
  };

  const handleCompanyCodeChange = (event) => {
    setCompanyCode(event.target.value);
  };

  const handleSubmit = async (ev) => {
    // Do something with the 'companyCode' variable here
    let businessId: string;
    let agencyId: string;
    let sender: string;
    // if (currCompany.role === UserRoleEnum.OWNER) {
    //   // businessId =
    //   agencyId = companyCode
    //   sender = CompanyTypeEnum.BUSINESS
    // } else if (currCompany.role === UserRoleEnum.AGENT) {
    //   businessId = companyCode
    //   // agencyId
    //   sender = CompanyTypeEnum.AGENCY;
    // };
    // console.log(companyCode, 'companyCode');
    // console.log(user);
    // const response = await ApiBussinesAgencyLinkingRequests({ businessId, agencyId, sender });

    // // console.log('response:', response);
    console.log('Submitted company code:', companyCode);
  };

  const handleLinkingRequestAction = async (event, boolean: boolean) => {
    if (boolean) {
      // console.log('boolean true:', boolean);
      // console.log('event true', event);
      // console.log('event.target.value', event.target.value);
      // await ApiApprovalRejectionRequest(event.target.value, RequestsStatusEnum.approved)
    } else {
      // console.log('boolean false:', boolean);
      // console.log('event false', event);
      // console.log('event.target.value', event.target.value);
      // await ApiApprovalRejectionRequest(event.target.value, RequestsStatusEnum.rejected)
    }
  };


  return (
    <>
      <Container className="manage-requests">
        <h1>בקשות ניהול</h1>
        <p>העסק מנוהל על ידי חברת <span>{managedBy}</span></p>
        <Form>
          <Form.Group className="input-container mb-3">
            <Form.Control type="number" placeholder="הכנס קוד חברה" value={companyCode} onChange={handleCompanyCodeChange} />
          </Form.Group>
          <button className='me-3' id='btn-ui' type="submit" onClick={(ev) => handleSubmit(ev)}>שליחת בקשת ניהול</button>
        </Form>
        <DataTable customStyles={customStyles} columns={columns} data={dataTable} fixedHeader responsive={true} striped highlightOnHover />
      </Container>
    </>
  );
};