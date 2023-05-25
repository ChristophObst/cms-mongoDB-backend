import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useRouter } from "next/router";
import ProductList from "../components/ProductList";

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #747571;
`;

const HeadlineContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #6e6357;
`;

const FirstNameHeadlineContainer = styled.div``;

const DbContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #7d6f60;
  font-size: 20px;
`;

const FirstNameContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const LastNameContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const PhoneContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;
const MailContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const SaveButton = styled.button`
  background-color: green;
  color: white;
  font-weight: bold;
  width: 160px;
  height: 25px;
  &:hover {
    background-color: lightgreen;
    color: black;
  }
`;

const DeleteButton = styled.button`
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

const EditButton = styled.button`
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

const Heading = styled.h1`
  text-align: center;
  color: var(--color-nemo);
`;

//

export default function HomePage() {
  const [inputFieldFirstName, setInputFieldFirstName] = useLocalStorageState(
    "inputField",
    {
      defaultValue: [],
    }
  );
  const [inputFieldLastName, setInputFieldLastName] = useLocalStorageState(
    "inputFieldLastName",
    {
      defaultValue: [],
    }
  );
  const [inputFieldPhone, setInputFieldPhone] = useLocalStorageState(
    "inputFieldPhone",
    {
      defaultValue: [],
    }
  );
  const [inputFieldMail, setInputFieldMail] = useLocalStorageState(
    "inputFieldMail",
    {
      defaultValue: [],
    }
  );

  const [todos, setTodos] = useLocalStorageState("todos", { defaultValue: [] });
  const [checkId, setCheckId] = useLocalStorageState("checkId", {
    defaultValue: [],
  });
  const [initialFirstName, setInitialFirstName] = useState();
  const [initialLastName, setInitialLastName] = useState();
  const [initialPhone, setInitialPhone] = useState();
  const [initialMail, setInitialMail] = useState();

  const [editing, setEditing] = useState(false);

  //-----------------------------------------------------------------------
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

  //-------

  const router = useRouter();
  const { data } = useSWR("/api/products");

  if (!data) {
    return <h1>Loading...</h1>;
  }
  //------------------------------------------------------------------
  function getInputFirstName(event) {
    setInputFieldFirstName(event.target.value);
  }
  function getInputLastName(event) {
    setInputFieldLastName(event.target.value);
  }
  function getInputPhone(event) {
    setInputFieldPhone(event.target.value);
  }
  function getInputMail(event) {
    setInputFieldMail(event.target.value);
  }

  function save() {
    setTodos([
      ...todos,
      {
        name: initialFirstName,
        lastName: initialLastName,
        phone: initialPhone,
        mail: initialMail,
        id: uid(),
      },
    ]);
    setInitialFirstName("");
    setInitialLastName("");
    setInitialPhone("");
    setInitialMail("");
  }

  function saveUpdate(todo) {
    setTodos(
      todos.map((todos) =>
        todos.id === checkId
          ? {
              ...todos,
              name: initialFirstName,
              lastName: initialLastName,
              phone: initialPhone,
              mail: initialMail,
              id: checkId,
            }
          : todos
      )
    );

    setInitialFirstName("");
    setInitialLastName("");
    setInitialPhone("");
    setInitialMail("");
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

  function handleDeleteTodo(todoToDelete) {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete));
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

  function handleCheckId(todoToCheck) {
    setCheckId(todoToCheck);
  }

  //-------------------------------------------------------------------------------------

  function NoEditingMode() {
    return (
      <>
        <SaveButton onClick={handleSubmit}>Save</SaveButton>
        <div>
          <h2>Database:</h2>
          <HeadlineContainer>
            <FirstNameHeadlineContainer>
              <h3>First Name</h3>
            </FirstNameHeadlineContainer>
            <h3>Last Name</h3>
            <h3>Phone</h3>
            <h3>Mail</h3>
            <h3>Actions</h3>
          </HeadlineContainer>
          {data.map((todo) => (
            <div key={todo.id}>
              <DbContainer>
                <FirstNameContainer>{todo.name}</FirstNameContainer>
                <LastNameContainer> {todo.lastName} </LastNameContainer>
                <PhoneContainer>{todo.phone} </PhoneContainer>
                <MailContainer>{todo.mail} </MailContainer>

                <EditButton
                  className="editButton"
                  type="button"
                  onClick={() => {
                    handleEditTodoFirstName(todo.name);
                    handleEditTodoLastName(todo.lastName);
                    handleEditTodoPhone(todo.phone);
                    handleEditTodoMail(todo.mail);
                    handleCheckId(todo.id);
                    setEditing(true);
                  }}
                >
                  Edit
                </EditButton>

                <DeleteButton
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </DeleteButton>
              </DbContainer>
            </div>
          ))}
        </div>
      </>
    );
  }

  //--------------------------------------------------------------------------------------------------------------
  function EditingMode() {
    return (
      <>
        <SaveButton
          onClick={() => {
            saveUpdate();
            setEditing(false);
          }}
        >
          Save and Update
        </SaveButton>
        <div>
          <h2>Database:</h2>
          <HeadlineContainer>
            <FirstNameHeadlineContainer>
              <h3>First Name</h3>
            </FirstNameHeadlineContainer>
            <h3>Last Name</h3>
            <h3>Phone</h3>
            <h3>Mail</h3>
            <h3>Actions</h3>
          </HeadlineContainer>

          {data.map((todo) => (
            <div key={todo.id}>
              <DbContainer>
                <FirstNameContainer>{todo.name}</FirstNameContainer>
                <LastNameContainer> {todo.lastName} </LastNameContainer>
                <PhoneContainer>{todo.phone} </PhoneContainer>
                <MailContainer>{todo.mail} </MailContainer>
                <EditButton
                  className="editButton"
                  type="button"
                  onClick={() => {
                    handleEditTodoFirstName(todo.name);
                    handleEditTodoLastName(todo.lastName);
                    handleEditTodoPhone(todo.phone);
                    handleEditTodoMail(todo.mail);
                    setEditing(true);
                  }}
                >
                  Edit
                </EditButton>

                <DeleteButton
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </DeleteButton>
              </DbContainer>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* <div className="App">
        <h1>Customer-Management-System</h1>
      </div> */}
      {/*  <InputContainer>
        <label>
          First Name:
          <input
            value={initialFirstName}
            onInput={getInputFirstName}
            onChange={handleInputFirstName}
          ></input>
        </label>
        <label>
          Last Name:
          <input
            value={initialLastName}
            onInput={getInputLastName}
            onChange={handleInputLastName}
          ></input>
        </label>
        <label>
          Phone:
          <input
            value={initialPhone}
            onInput={getInputPhone}
            onChange={handleInputPhone}
          ></input>
        </label>
        <label>
          Mail:
          <input
            value={initialMail}
            onInput={getInputMail}
            onChange={handleInputMail}
          ></input>
        </label>
      </InputContainer> */}
      {/* {editing ? <EditingMode /> : <NoEditingMode />} */}

      <ProductList />
    </>
  );
}
