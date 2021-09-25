import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;

export const Division = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const Section = styled.div`
    width: ${ ({ width }) =>  width + '%'};
`;

export const Navbar = styled.div``;

export const Sidebar = styled.div`
    height: 100%;
`;

export const Content = styled.div``;