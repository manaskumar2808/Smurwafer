import styled from 'styled-components/macro';

export const Container = styled.div`
    padding: 20px;
`;

export const Wrapper = styled.div`
    width: 80%;
    margin: auto;
`;

export const Menu = styled.div`
    height: 15%;
    /* border-top: 0.2px solid #ccc; */
    white-space: nowrap;
    overflow-x: overlay;
    padding: 5px;
    align-items: center;
    justify-content: center;
`;

export const MenuItem = styled.div`
    display: inline-block;
    position: relative;
    height: 75px;
    margin-right: 5px;
    border: ${ ({ isActive }) => isActive ? '0.2px solid #1894ff' : '0.2px solid #ccc' } ;
    background-color: #d1d1d1;
    width: 75px;
    vertical-align: top;
`;

export const MenuPhoto = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    &:hover {
        filter: brightness(50%);
    }
`;