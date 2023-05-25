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
  const [initialLastName, setInitialLastName] = useState();
  const [initialPhone, setInitialPhone] = useState();
  const [initialMail, setInitialMail] = useState();

  const [editing, setEditing] = useState(false);

  //---------------------------------
  const products = useSWR("/api/products");

  const { data, isLoading, error, mutate } = useSWR("/api/products");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    alert("Entry Submitted!");
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
    event.target.reset();
  }
  //--------------------------

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
      push("/");
    } else {
      console.error(response.status);
    }
  }

  //----------------------------

  const router = useRouter();

  if (!data) {
    return <h1>Loading...</h1>;
  }

  function handleInputFirstName(event) {
    setInitialFirstName(event.target.value);
  }
  function handleInputLastName(event) {
    setInitialLastName(event.target.value);
  }
  function handleInputPhone(event) {
    setInitialPhone(event.target.value);
  }
  function handleInputMail(event) {
    setInitialMail(event.target.value);
  }

  function handleEditTodoFirstName(todoToEdit) {
    setInitialFirstName(todoToEdit);
  }
  function handleEditTodoLastName(todoToEdit) {
    setInitialLastName(todoToEdit);
  }
  function handleEditTodoPhone(todoToEdit) {
    setInitialPhone(todoToEdit);
  }
  function handleEditTodoMail(todoToEdit) {
    setInitialMail(todoToEdit);
  }

  function NoEditingMode() {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h1>Customer-Management-System via MongoDB</h1>
          <label htmlFor="firstName">
            First Name:
            <input
              /*  value={initialFirstName}
            onChange={handleInputFirstName} */
              type="text"
              id="firstName"
              name="firstName"
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              /* value={initialLastName}
            onChange={handleInputLastName} */
              type="text"
              id="lastName"
              name="lastName"
            />
          </label>

          <label htmlFor="phone">
            Phone:
            <input type="text" id="phone" name="phone" />
          </label>
          <label htmlFor="mail">
            mail:
            <input type="text" id="mail" name="mail" />
          </label>
          {/*  <label htmlFor="currency">
          Currency:
          <select id="currency" name="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </label> */}
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }

  function EditingMode() {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h1>Customer-Management-System via MongoDB</h1>
          <label htmlFor="firstName">
            First Name:
            <input
              /*  value={initialFirstName}
            onChange={handleInputFirstName} */
              type="text"
              id="firstName"
              name="firstName"
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              /* value={initialLastName}
            onChange={handleInputLastName} */
              type="text"
              id="lastName"
              name="lastName"
            />
          </label>

          <label htmlFor="phone">
            Phone:
            <input type="text" id="phone" name="phone" />
          </label>
          <label htmlFor="mail">
            mail:
            <input type="text" id="mail" name="mail" />
          </label>
          {/*  <label htmlFor="currency">
          Currency:
          <select id="currency" name="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </label> */}
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }

  return (
    <>
      {editing ? <EditingMode /> : <NoEditingMode />}
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
        {!isLoading &&
          !error &&
          data.map((product) => (
            <div key={product._id}>
              <DbContainerBackend>
                <FirstNameContainerBackend>
                  {product.firstName}
                </FirstNameContainerBackend>
                <LastNameContainerBackend>
                  {product.lastName}
                </LastNameContainerBackend>
                <PhoneContainerBackend>{product.phone} </PhoneContainerBackend>
                <MailContainerBackend>{product.mail} </MailContainerBackend>
                <EditButtonBackend
                  className="editButton"
                  type="button"
                  onClick={() => {
                    handleEditTodoFirstName(product.firstName);
                    handleEditTodoLastName(product.lastName);
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
                  onClick={() => handleDeleteProduct()}
                >
                  Delete
                </DeleteButtonBackend>
              </DbContainerBackend>
            </div>
          ))}
      </div>
    </>
  );
}
