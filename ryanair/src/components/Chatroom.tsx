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


// Firebase imports
import app from "./firebaseConfig";
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


// Message interface
interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: Timestamp | null;
  city: string;
}


export function Chatroom() {
  const { currentUser } = useAuth();
  const { city } = useParams();

  // State for messages
  const [messages, setMessages] = React.useState<Message[]>([]);

  // Firestore database reference
  const db = getFirestore(app);

  React.useEffect(() => {
    if (!city) {
      console.error("City is undefined or null");
      return;
    }

    // Query setup for messages collection, ordered by timestamp and filtered by city
    const messagesRef = collection(db, "messages");

    // Query setup for messages collection, ordered by timestamp and filtered by city
    const q = query(messagesRef, orderBy("timestamp"));

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

  const [input, setInput] = React.useState("");

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement the logic to send the message to Firestore
    sendMessageToFirestore(input, currentUser?.uid);
    setInput(""); // Reset input after sending
  };

  //scrolling

const endOfMessagesRef = React.useRef<HTMLDivElement>(null);


 React.useEffect(() => {
   if (endOfMessagesRef.current) {
     endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
   }
 }, [messages]);


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
