const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
  INVALID_EMAIL: "সঠিক ইমেইল দিন।",
  INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
  USER_NOT_FOUND: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
};

export function authErrorMessage(error: {
  code?: string;
  message?: string;
}): string {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  return error.message || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।";
}