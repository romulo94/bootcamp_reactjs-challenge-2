import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;

  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px; */
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 10px 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 24px;
      margin-top: 10px;
      overflow: hidden;
      max-width: 190px;
      white-space: nowrap;
    }

    img {
      width: 64px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }

  div.buttons-container {
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    button {
      background: none;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: bold;
      i {
        margin-right: 3px;
      }
      &:nth-child(2n) {
        border: 1px solid #9b65e6;
        color: #9b65e6;
        &:hover {
          background: #9b65e680;
          color: #fff;
        }
      }
      &:nth-child(2n - 1) {
        border: 1px solid #018a50;
        color: #018a50;
        &:hover {
          background: #018a5080;
          color: #fff;
        }
      }
    }
  }
`;
