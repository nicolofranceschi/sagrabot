import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection };
  justify-content: ${({ justifyContent = 'center' }) => justifyContent };
  align-items: ${({ alignItems = 'center' }) => alignItems };
  width: ${({ width }) => width ? width : 'auto'};
  height: ${({ height }) => height ? height : 'auto'};
  padding: ${({ padding }) => padding ? padding : '0'};
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const Input = styled.input`
  border: 1.3px solid var(--border-gray);
  border-radius: var(--border-radius);
  outline: none;
  background-color: var(--white);
  padding: 5px 12px;
  width: ${({ width }) => width ? width : 'auto'};
  height: ${({ height }) => height ? height : 'auto'};
  margin: ${({ margin }) => margin ? margin : '0'};
  transition: background-color 0.4s ease, border-color 0.4s ease;
  :focus {
    border-color: var(--main-light);
    background-color: var(--main-light);
  }
  :disabled {
    background-color: var(--border-gray);
  }
`;

export const Button = styled.button`
  width: 100%;
  height:6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vh; 
  text-align: center;
  vertical-align: middle;
  background-color: ${({ color }) => color ? color : "var(--main)" };
  color: var(--white);
  border-radius: var(--border-radius);
  padding: ${({ padding }) => padding ? padding : '0'};
  font-weight: bold;
  margin: ${({ margin }) => margin ? margin : '0'};
`;

export const ExternalLink = ({ children, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;