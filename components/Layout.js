import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      <StyledFooter>
        <span>
          {`Made with <3 by Moonprint Team`}
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </span>
      </StyledFooter>
    </div>
  );
};

export default Layout;
