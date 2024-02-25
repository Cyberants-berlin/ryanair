/* eslint-disable @typescript-eslint/no-unused-vars */
// React and related hooks
import * as React from "react";
import { useAuth } from "./AuthContext";

// UI Components 
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

// Icons and utils
import { Send } from "lucide-react";
import { cn } from "../lib/utils";




//THIS IS THE FIREBASE CONFIGURATION, INCLUDES API KEY
import app from "./firebaseConfig";


//IMPORTED FROM FIREBASE FIRESTORE LIBRARY, USED TO INTERACT WITH FIRESTORE DATABASE
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy, 
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { useParams } from "react-router";

import ScrollArea from "../components/ui/scroll-area";


// THIS PART CREATES A TEMPLATE, EACH MESSAGE HAS ID OF USER, CONTENT, WHEN IT WAS SENT, THE CITY IT BELONGS TO
interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: Timestamp | null;
  city: string;
}


export function Chatroom() {
  // THIS LINE GETS THE CURRENT LOGGEDIN-USER, CITY PARAMETER FROM THE URL USING CUSTOM HOOKS
  const { currentUser } = useAuth();
  const { city } = useParams();

  // THIS CREATES A STATE VARIABLE messages , ITS AN EMPTY ARRAY FOR STORING MESSAGES
  const [messages, setMessages] = React.useState<Message[]>([]);

  // SETS UP A REFERENCE TO THE FIRESTORE DATABASE
  const db = getFirestore(app);

  // THIS HOOK RUNS WHEN THE COMPONENT MOUNTS (AUFSTEIGT), AND WHEN DB OR CITY CHANGES
  //RESPONSIBLE FOR FETCHING MESSAGES FROM FIRESTORE
  React.useEffect(() => {
    if (!city) {
      console.error("City is undefined or null");
      return;
    }

    // THESE LINES SET UP A QUERY FOR THE FIRESTORE DATABASE TO GET MESSAGES, ORDERED BY THEIR TIMESTAMP
    const messagesRef = collection(db, "messages");
    // Query setup for messages collection, ordered by timestamp and filtered by city
    const q = query(messagesRef, orderBy("timestamp"));

    // SETS UP A REAL_TIME_LISTENER FOR THE MESSAGES COLLECTION. WHEN MESSAGES CHANGE,
    // IT UPDATES THE messages STATE
    // Real-time listener for Firestore messages collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(fetchedMessages);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [db, city]);

  // THIS FUNCTION SENDS A MESSAGE TO FIRESTORE. IT TAKES THE MESSAGE TEXT AND THE USER ID AS ARGUMENTS
  const sendMessageToFirestore = async (
    messageText: string,
    userId: string | undefined
  ) => {
    if (!userId) {
      console.error("User ID is undefined. Cannot send message.");
      return;
    }

    try {
      const messagesRef = collection(db, "messages");

      addDoc(messagesRef, {
        content: messageText,
        userId: userId,
        timestamp: Timestamp.now(),
        city: city,
      });
    } catch (error) {
      console.error("Error sending message to Firestore:", error);
    }
  };

  // A STATE TO KEEP TRACK OF THE USERS INPUT IN THE MESSAGE BOX
  const [input, setInput] = React.useState("");

  // THIS FUNCTION IS CALLED WHEN A USER SUBMITS A MESSAGE. IT SENDS THE MESSAGE TO FIRESTORE AND
  //RESETS THE INPUT FIELD
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // send the message to Firestore
    sendMessageToFirestore(input, currentUser?.uid);
    setInput(""); // Reset input after sending
  };

  //scrolling
  // SETS UP A USEEFFECT TO SCROLL AUTOMATICALLY TO THE LATEST MESSAGE
  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //This part of the code is responsible for rendering the messages on the screen. 
  // The div with endOfMessagesRef helps in scrolling to the end of the messages.
  {
    /* ...rendering messages... */
  }
  <div ref={endOfMessagesRef} />;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center"></CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full overflow-y-auto">
            <div className="space-y-4">
              {messages
                .filter((message) => message.city === city)
                .map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      message.userId === currentUser?.uid
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                ))}
            </div>
            <div ref={endOfMessagesRef} />{" "}
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={input.trim().length === 0}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
