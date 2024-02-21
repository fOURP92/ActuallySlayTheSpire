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

          console.log(fileObject.character_chosen);

          if (fileObject.killed_by) {
            if (fileObject.character_chosen === 'IRONCLAD') {
              ironclad.loses++;
            }
            if (fileObject.character_chosen === 'THE_SILENT') {
              silent.loses++;
            }
            if (fileObject.character_chosen === 'DEFECT') {
              defect.loses++;
            }
            if (fileObject.character_chosen === 'WATCHER') {
              watcher.loses++;
            }
          } else {
            if (fileObject.character_chosen === 'IRONCLAD') {
              ironclad.wins++;
            }
            if (fileObject.character_chosen === 'THE_SILENT') {
              silent.wins++;
            }
            if (fileObject.character_chosen === 'DEFECT') {
              defect.wins++;
            }
            if (fileObject.character_chosen === 'WATCHER') {
              watcher.wins++;
            }
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

  // Log and return the results after all files have been processed
  console.log('ironclad:', ironclad);
  console.log('silent:', silent);
  console.log('defect:', defect);
  console.log('watcher:', watcher);
  return [ironclad, silent, defect, watcher];
}

export { parseRuns };
