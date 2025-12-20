// ...existing code...
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
// ...existing imports...
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// ...existing code...

const EmailLoginPage = () => {
    // ...existing state and hooks...

    const auth = getAuth();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            if (!firebaseUser) throw new Error("No user returned from Google sign-in");

            const uid = firebaseUser.uid;
            const email = firebaseUser.email || "";

            // Ensure users doc exists (create if missing)
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid,
                    email,
                    mobileNumber: "",
                    createdAt: Date.now(),
                    reviewAccess: false,
                });
            }

            const userData = (userDoc.exists() && userDoc.data()) || {};
            localStorage.setItem("user", JSON.stringify({
                mobileNumber: userData.mobileNumber || "",
                email: email,
                uid: uid,
                review: userData.reviewAccess || false,
            }));

            navigate("/user-profile");
        } catch (err) {
            console.error("Google sign-in error:", err);
            setNumErrorMsg("Google sign-in failed. Try again.");
        }
    };

    // ...existing code...

    return (
        <Box sx={{ height: "100vh" }}>
            {/* ...existing layout ... */}
            {
                !isOtpsent ?
                    (
                        <Box sx={{ width: { md: "50%", } }}>
                            {/* Add Google sign-in button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={handleGoogleSignIn}
                                sx={{ mb: 2, fontWeight: "bold" }}
                            >
                                Sign in with Google
                            </Button>

                            {/* existing Send OTP UI */}
                            {/* ...existing Send OTP UI code ... */}
                        </Box>
                    ) : (
                        // ...existing OTP verification UI ...
                    )
            }
            {/* ...existing footer ... */}
        </Box>
    );
};
// ...existing code...


<Box sx={{ width: { md: "50%" } }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component="img"
                  alt="otp page"
                  src={sendOtpimg}
                  sx={{
                    width: "130px",
                    height: "140px",
                    // ml: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                />
              </Box>
              <Typography
                gutterBottom
                sx={{
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontWeight: "bold",
                  textAlign: "center",
                  color: { md: "white" },
                }}
              >
                Login Now !
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ textAlign: "center", color: { md: "white" } }}
              >
                We will send you an One Time Password(OTP) to the given Phone
                Number.
              </Typography>
              <Box p={4} />
              <CustomButton
              title="Login with Gmail"
              onPressed={handleGoogleSignIn}
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "white",
                fontSize: { sm: 15, xs: 12 },
                textTransform: "none",
              }}
              hoverColor="#1fd4af"
              hoverTxtColor="white"
              startIcon={
                <Box
                  component="img"
                  alt="Google Login"
                  src={gicon}
                  sx={{ width: 32 }}
                />
              }
            />
            </Box>