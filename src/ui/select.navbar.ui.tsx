import { useSelector } from "react-redux";
import { UserEntity } from "../common/types/entities/user.entity";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { CompanyEntity } from "../common/types/entities/company.entity";

export const SelectNavbarUi: React.FC = () => {
    const user = useSelector((state: RootState) => state?.user?.user) as UserEntity;
    const [currCompany, setCurrCompany] = useState<CompanyEntity | null>(user.userRoles[0].company);

    const handleSelect = (event) => {
        const company = getCompanyById(+event.target.value)
        setCurrCompany(company)
    };

    useEffect(() => {
        console.log(user)
    }, [currCompany])

    function getCompanyById(companyId: number) {
        const company = user.userRoles.find((userRole) => userRole.company.id === companyId);
        return company.company;
    }

    return (
        <select name="" id="" onChange={(ev) => (handleSelect(ev))}>
            {user.userRoles.map((userRole) => (
                <option key={userRole.company.id} value={userRole.company.id}>
                    {userRole.company.name}, {userRole.role}
                </option>
            ))}
        </select>
    );
};