import React, { useEffect } from 'react';
import { Container, Wrapper } from './styles/not-found';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';


const NotFoundPage = (props) => {
    const history = useHistory();
    const { closeSidebar } = props;

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);

    const goToHome = () => {
        history.push('/');
    }

    return (
        <Container>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={goToHome}>
                        Back Home
                    </Button>
                }
            />
        </Container>
    );
}

export default NotFoundPage;