//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

import ChatAppJson from "./ChatApp.json";

export const ChatAppAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Log the ABI to verify it's imported correctly
console.log("Imported ABI:", ChatAppJson);

// Export the ABI directly from the JSON file
export const ChatAppABI = ChatAppJson;