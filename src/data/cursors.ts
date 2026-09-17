export interface FakeCursorConfig {
  id: string;
  cursorImage: string;
  /** Shown while the cursor is "typing" a chat bubble. */
  cursorArrowImage: string;
  themeColor: string;
  initialDelay: number;
  messages: string[];
}

export const FAKE_CURSORS: FakeCursorConfig[] = [
  {
    id: "safwan",
    cursorImage: "/images/cursors/safwan.svg",
    cursorArrowImage: "/images/cursors/safwan-arrow.svg",
    themeColor: "#4F46E5",
    initialDelay: 0,
    messages: [
      "Cok laper dah",
      "web gweh keren bet jir awokaowok",
      "Eh anu",
      "lu ngapain dah mondar mandir bae",
      "Welcome to my web porto ygy",
    ],
  },
  {
    id: "fuhim",
    cursorImage: "/images/cursors/amber.svg",
    cursorArrowImage: "/images/cursors/amber-arrow.svg",
    themeColor: "#ffab2f",
    initialDelay: 3000,
    messages: [
      "Meksens",
      "Keren juga web lu wann",
      "Anjaayy ini lu yang buat wan",
      "Woi wann",
      "Info tutor puh sepuhh",
      "Geloyy",
    ],
  },
];
