import styled from "styled-components";
import Brand from "../../components/pages/login/Brand";
import Meta from "../../components/seo/Meta";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

/**
 *
 * @returns Loign page
 */

const index = () => {
  return (
    <>
      <Meta title="Login - PetMe" />
      <LoginPage>
        <div>
          <Brand />
        </div>
      </LoginPage>
    </>
  );
};

export default index;
