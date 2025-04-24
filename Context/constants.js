//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

import ChatAppJson from "./ChatApp.json";

export const ChatAppAddress = "0x1f551140e072d46BD30B100F66661A53027B2B10";

// Log the ABI to verify it's imported correctly
console.log("Imported ABI:", ChatAppJson);

// Export the ABI directly from the JSON file
export const ChatAppABI = ChatAppJson;