import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 0.2px solid #ccc;
    align-items: center;
`;

export const Section = styled.div``;

export const Left = styled.div`
    width: 15%;
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const Brand = styled.div`
    cursor: pointer;
    font-family: 'Pacifico';
    font-size: 20px;

    &::first-letter {
        color: #1890FF;
    }
`;

export const SearchSection = styled.div`
    width: 65%;
`;

export const Right = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
`;

export const NavItem = styled.div`
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-left: 20px;

    &:hover {
        color: #1890FF;
    }
`;

export const Nav = styled(NavLink)`

`;  