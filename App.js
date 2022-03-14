import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth, firestore } from "./src/firebase/config";
import LogOut from "./src/firebase/Auth/LogOut";
import { StyleSheet } from "react-native";
import {
  Welcome,
  FollowMore,
  UrgentHelp,
  TakeVideo,
  ShareContent,
  LikeConn,
  PlayVideo,
  UploadVideo,
  MedicalHome,
  Upload,
  UpdateProfile,
  Home,
  EmergencyContacts,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  DoctorSignUp,
  MedSignIn,
  Doctor,
  Clone,
} from "./src/Screens";

const Stack = createStackNavigator();

export default function App() {
  const [id, setID] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  const Exit = () => {
    LogOut();
  };

  useEffect(() => {
    try {
      auth.onAuthStateChanged((doc) => (doc ? setID(doc.uid) : setID(null)));
    } catch (err) {
      null;
    }
  }, []);

  useEffect(() => {
    if (id) {
      firestore
        .collection("Users")
        .doc(id)
        .get()
        .then((doc) => setDoctor(doc.data().doctor));
    }
  }, [id]);

  useEffect(() => {
    if (auth.currentUser) {
      if (auth.currentUser.metadata.creationTime === new Date()) {
        setFirstTimeUser(true);
      }
    }
  }, [auth.currentUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {id ? (
          doctor ? (
            <>
              {firstTimeUser ? (
                <>
                  <Stack.Screen name="TakeVideo" component={TakeVideo} options={{ headerShown: false }} />
                  <Stack.Screen name="ShareContent" component={ShareContent} options={{ headerShown: false }} />
                  <Stack.Screen name="LikeConn" component={LikeConn} options={{ headerShown: false }} />
                </>
              ) : null}
              <Stack.Screen name="DocHome" options={{ headerShown: false }}>
                {(props) => <MedicalHome {...props} Exit={Exit} />}
              </Stack.Screen>
              <Stack.Screen name="Upload" options={{ headerShown: false }}>
                {(props) => <Upload {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Update" component={UpdateProfile} options={{ headerShown: false }} />
              <Stack.Screen name="UploadVideo" component={UploadVideo} options={{ headerShown: false }} />
              <Stack.Screen name="PlayVideo" component={PlayVideo} options={{ headerShown: false }} />
              <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              {firstTimeUser ? (
                <>
                  <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                  <Stack.Screen name="FollowMore" component={FollowMore} options={{ headerShown: false }} />
                  <Stack.Screen name="UrgentHelp" component={UrgentHelp} options={{ headerShown: false }} />
                </>
              ) : null}

              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} Exit={Exit} />}
              </Stack.Screen>
              <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: false }} />
              <Stack.Screen name="PlayVideo" component={PlayVideo} options={{ headerShown: false }} />
              <Stack.Screen name="EmergencyContacts" options={{ headerShown: false }} >
                {(props) => <EmergencyContacts {...props} />}
              </Stack.Screen>
            </>
          )
        ) : (
          <>
            <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
            
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />

            <Stack.Screen name="MedSignIn" options={{ headerShown: false }} component={MedSignIn} />

            <Stack.Screen name="DoctorSignUp" options={{ headerShown: false }} component={DoctorSignUp} />

            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="DocHome" options={{ headerShown: false }}>
                {(props) => <MedicalHome {...props} Exit={Exit} />}
                </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    alignItems: "center",
    justifyContent: "center",
  },
});
