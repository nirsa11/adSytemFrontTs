import Dropdown from 'react-bootstrap/Dropdown';
import { UserRoleEnum, UserRoleEnumSelection } from '../../../common/types/enum/userRole.enum';
import { Container } from 'react-bootstrap';

export type RolePageProps = {
  setRole: (role: UserRoleEnum) => void;
  role: UserRoleEnum;
};

export const RolePage: React.FC<RolePageProps> = ({ setRole, role }) => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-start gap-3">
      <h1 id='main-title' className="display-5 fs-2">שלום וברוכים הבאים למערכת הפרסום של PieChat!</h1>
      <p id='text' className="fs-6 fw-light">
        לנוחיותך, המערכת שלנו מציעה פתרונות עבור מגוון תפקידים רחב, כדוגמת: סוכנות פרסום - בחר
        באפשרות זו באם הינך סוכנות פרסום אשר עתידה לנהל יותר ממותג אחד. עסק - בחר באפשרות זו באם
        הינך בעלים/מייצג עסק שאינו רשום לפלטפורמה זו. אנליסט - בחר באפשרות זו אם ברצונך להצטרף
        כאנליסט לסוכנות פרסום ו/או לעסק קיים.
      </p>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {role ? UserRoleEnumSelection[role] : 'בחר את סוג החשבון '}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.keys(UserRoleEnum).map((role) => {
            return (
              <Dropdown.Item onClick={() => setRole(UserRoleEnum[role])}>
                {UserRoleEnumSelection[role]}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};
