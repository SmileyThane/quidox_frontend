import styled from 'styled-components'

const GoBack = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: .1rem solid ${({ brand }) => brand ? brand.border_color : '#40a9ff'};
  font-size: 2rem;
  color: map-get($colors, blue);
  transition: .3s linear;
  cursor: pointer;
  margin-right: 2rem;
  &:hover {
    background-color: ${({ brand }) => brand ? brand.border_color : '#40a9ff'};
    color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'};
  }
`

export default GoBack
