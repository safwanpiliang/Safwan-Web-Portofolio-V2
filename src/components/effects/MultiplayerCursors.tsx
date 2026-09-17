import { FakeCursor } from "./FakeCursor";
import { FAKE_CURSORS } from "@/data/cursors";

export function MultiplayerCursors() {
  return (
    <>
      {FAKE_CURSORS.map(({ id, ...config }) => (
        <FakeCursor key={id} {...config} />
      ))}
    </>
  );
}
