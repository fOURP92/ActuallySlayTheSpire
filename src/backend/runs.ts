import { CharacterWinRateDto } from 'src/dtos/CharacterWinRateDto';

async function parseRuns(
  allFiles: FileList,
  character: string | null = null
): Promise<CharacterWinRateDto[]> {
  const ironclad: CharacterWinRateDto = { wins: 0, loses: 0, name: 'IRONCLAD' };
  const silent: CharacterWinRateDto = { wins: 0, loses: 0, name: 'THE_SILENT' };
  const defect: CharacterWinRateDto = { wins: 0, loses: 0, name: 'DEFECT' };
  const watcher: CharacterWinRateDto = { wins: 0, loses: 0, name: 'WATCHER' };

  // Define a function to read a single file
  async function readFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Define a callback function to handle the file reading operation
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const fileContent = event.target.result as string;
          const fileObject = JSON.parse(fileContent);

          const characterChosen: string = fileObject.character_chosen;
          console.log(characterChosen);
          switch (characterChosen) {
            case 'IRONCLAD':
              fileObject.killed_by ? ironclad.loses++ : ironclad.wins++;
              break;
            case 'THE_SILENT':
              fileObject.killed_by ? silent.loses++ : silent.wins++;
              break;
            case 'DEFECT':
              fileObject.killed_by ? defect.loses++ : defect.wins++;
              break;
            case 'WATCHER':
              fileObject.killed_by ? watcher.loses++ : watcher.wins++;
              break;
          }
          resolve();
        }
      };

      // Start reading the file as text
      reader.readAsText(file);
    });
  }

  // Read all files asynchronously
  await Promise.all(Array.from(allFiles).map((file) => readFile(file)));

  return [ironclad, silent, defect, watcher];
}

export { parseRuns };
