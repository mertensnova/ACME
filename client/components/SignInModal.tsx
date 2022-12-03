import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { Mail } from "./icons/Mail";
import { Password } from "./icons/Password";
import { API_URL } from "../pages/api/url";
import { registerUser } from "../pages/api/auth";
import User from "./icons/User";
import UserCircle from "./icons/UserCircle";
import Profile from "./icons/Profile";

export default function SignInModal() {
   const handler = () => setVisible(true);
   const [visible, setVisible] = React.useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [fullname, setFullname] = useState("");
   const [image, setImage] = useState(null);

   const handleImage = (e: any) => {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
         setImage(e.target.result);
      };
      fileReader.readAsDataURL(file);
   };

   const closeHandler = () => {
      setVisible(false);
   };

   return (
      <>
         <form
            onSubmit={(e: any) => {
               e.preventDefault();

               registerUser({ username, email, password, fullname, image });
            }}
            method="post"
            action={`${API_URL}/register`}
            encType="multipart/form-data"
            id="signform"
         >
            <div>
               <Button auto flat onClick={handler}>
                  Sign Up
               </Button>
               <Modal
                  blur
                  closeButton
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
               >
                  <Modal.Header>
                     <Text id="modal-title" size={18}>
                        Sign up for
                        <Text b size={18}>
                           ACME
                        </Text>
                     </Text>
                  </Modal.Header>

                  <Modal.Body>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={"text"}
                        name="Fullname"
                        value={fullname}
                        placeholder="Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        contentLeft={<UserCircle fill="currentColor" />}
                     />
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={"text"}
                        name="Username"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        contentLeft={<User fill="currentColor" />}
                     />
                     <Input
                        clearable
                        name="Email"
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        value={email}
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                        contentLeft={<Mail fill="currentColor" />}
                     />
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={"password"}
                        name="Password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        contentLeft={<Password fill="currentColor" />}
                     />
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type="file"
                        name="Profile"
                        form="signform"
                        placeholder="Profile Picture"
                        onChange={handleImage}
                        contentLeft={<Profile fill="currentColor" />}
                     />
                  </Modal.Body>
                  <Modal.Footer>
                     <Button auto flat color="error" onClick={closeHandler}>
                        Close
                     </Button>
                     <Button
                        form="signform"
                        onClick={closeHandler}
                        flat
                        type="submit"
                        auto
                     >
                        Sign in
                     </Button>
                  </Modal.Footer>
               </Modal>
            </div>
         </form>
      </>
   );
}
