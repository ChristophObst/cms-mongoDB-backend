import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledButton } from "../Button/Button.styled";
import { StyledList } from "./ProductList.styled";

const InputContainerBackend = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #747571;
`;

const HeadlineContainerBackend = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #6e6357;
`;

const FirstNameHeadlineContainerBackend = styled.div``;

const DbContainerBackend = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #7d6f60;
  font-size: 20px;
`;

const FirstNameContainerBackend = styled.div`
  background-color: #877765;
  width: 20%;
`;

const LastNameContainerBackend = styled.div`
  background-color: #877765;
  width: 20%;
`;

const PhoneContainerBackend = styled.div`
  background-color: #877765;
  width: 20%;
`;
const MailContainerBackend = styled.div`
  background-color: #877765;
  width: 20%;
`;

const DeleteButtonBackend = styled.button`
  background-color: #c21717;
  color: white;
  font-weight: bold;
  width: 80px;
  height: 25px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const EditButtonBackend = styled.button`
  background-color: #163dc9;
  color: white;
  width: 80px;
  font-weight: bold;
  height: 25px;
  &:hover {
    background-color: lightblue;
    color: black;
  }
`;

export default function ProductList() {
  const [initialFirstName, setInitialFirstName] = useState();

  //---------------------------------
  const products = useSWR("/api/products");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      products.mutate();
      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  //----------------------------

  const router = useRouter();
  const { data } = useSWR("/api/products");

  if (!data) {
    return <h1>Loading...</h1>;
  }

  function handleInputFirstName(event) {
    setInitialFirstName(event.target.value);
  }

  function handleEditTodoFirstName(toEdit) {
    setInitialFirstName(toEdit);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Add a new Fish</h1>
        <label htmlFor="name">
          Name:
          <input
            value={initialFirstName}
            onChange={handleInputFirstName}
            type="text"
            id="name"
            name="name"
          />
        </label>
        {/*  <label htmlFor="description">
        Description:
        <input type="text" id="description" name="description" />
      </label>
      <label htmlFor="price">
        Price:
        <input type="number" id="price" name="price" min="0" />
      </label>
      <label htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </label> */}
        <button type="submit">Submit</button>
      </form>

      <div>
        {data.map((product) => (
          <li key={product._id}>
            <div
              type="text"
              /*   onClick={() => router.push(`/${product._id}`)} */
            >
              {product.name}
            </div>
          </li>
        ))}
      </div>
      {/* //------------------------------------------- */}
      <div>
        <h2>Database:</h2>
        <HeadlineContainerBackend>
          <FirstNameHeadlineContainerBackend>
            <h3>First Name</h3>
          </FirstNameHeadlineContainerBackend>
          <h3>Last Name</h3>
          <h3>Phone</h3>
          <h3>Mail</h3>
          <h3>Actions</h3>
        </HeadlineContainerBackend>

        {data.map((product) => (
          <li key={product.id}>
            <DbContainerBackend>
              <FirstNameContainerBackend>
                {product.name}
              </FirstNameContainerBackend>
              {/*  <LastNameContainerBackend>
                {" "}
                {product.lastName}{" "}
              </LastNameContainerBackend>
              <PhoneContainerBackend>{product.phone} </PhoneContainerBackend>
              <MailContainerBackend>{product.mail} </MailContainerBackend> */}
              <EditButtonBackend
                className="editButton"
                type="button"
                onClick={() => {
                  handleEditTodoFirstName(product.name);
                  /*      handleEditTodoLastName(product.lastName);
                  handleEditTodoPhone(product.phone);
                  handleEditTodoMail(product.mail); */
                  /*  setEditing(true); */
                }}
              >
                Edit
              </EditButtonBackend>

              <DeleteButtonBackend
                className="deleteButton"
                type="button"
                onClick={() => handleDeleteTodo(product.id)}
              >
                Delete
              </DeleteButtonBackend>
            </DbContainerBackend>
          </li>
        ))}
      </div>
    </>
  );
}
