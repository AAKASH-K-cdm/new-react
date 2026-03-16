import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

const writeLog = async (collectionName, payload) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...payload,
      createdAt: serverTimestamp()
    });
    return true;
  } catch {
    return false;
  }
};

export const logLoginEvent = async ({ name, email, userId }) =>
  writeLog("loginEvents", {
    name: normalizeString(name),
    email: normalizeString(email).toLowerCase(),
    userId: userId || null,
    source: "web"
  });

export const logRegisterEvent = async ({ name, email, mobile, userId }) =>
  writeLog("registerEvents", {
    name: normalizeString(name),
    email: normalizeString(email).toLowerCase(),
    mobile: normalizeString(mobile),
    userId: userId || null,
    source: "web"
  });

export const logContactMessage = async ({ name, email, company, message }) =>
  writeLog("contactMessages", {
    name: normalizeString(name),
    email: normalizeString(email).toLowerCase(),
    company: normalizeString(company),
    message: normalizeString(message),
    source: "web"
  });
