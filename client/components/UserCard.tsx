import {
   Card,
   Col,
   Row,
   Button,
   Text,
   Container,
   Spacer,
} from "@nextui-org/react";
import { API_URL } from "../pages/api/url";

const UserCard = ({ user }: any) => {
   const { fullname, username, image, email } = user[0];
   return (
      <>
         <Spacer y={3} />
         <Container
            css={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Card css={{ w: "50%", h: "400px" }}>
               <Card.Body css={{ p: 0 }}>
                  <Card.Image
                     src="https://nextui.org/images/card-example-5.jpeg"
                     objectFit="cover"
                     width="100%"
                     height="100%"
                     alt="Relaxing app background"
                  />
               </Card.Body>
               <Card.Footer
                  isBlurred
                  css={{
                     position: "absolute",
                     bgBlur: "#0f111466",
                     borderTop: "$borderWeights$light solid $gray800",
                     bottom: 0,
                     zIndex: 1,
                  }}
               >
                  <Row>
                     <Col>
                        <Row>
                           <Col span={3}>
                              <Card.Image
                                 src={`${API_URL}/${image}`}
                                 css={{ bg: "black", br: "50%" }}
                                 height={40}
                                 width={40}
                                 alt="Breathing app icon"
                              />
                           </Col>
                           <Col>
                              <Text color="#d1d1d1" size={12}>
                                 {fullname}
                              </Text>
                              <Text color="#d1d1d1" size={12}>
                                 {username}
                              </Text>
                           </Col>
                        </Row>
                     </Col>
                     <Col>
                        <Row justify="flex-end">
                           <Button flat auto rounded color={"primary"}>
                              <Text
                                 css={{ color: "inherit" }}
                                 size={12}
                                 weight="bold"
                                 transform="uppercase"
                              >
                                 Edit Profile
                              </Text>
                           </Button>
                        </Row>
                     </Col>
                  </Row>
               </Card.Footer>
            </Card>
         </Container>
      </>
   );
};

export default UserCard;
