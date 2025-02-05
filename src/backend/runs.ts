import { CharacterWinRateDto } from 'src/dtos/CharacterWinRateDto';
import { Loading } from 'quasar';
import { useFilesStore } from '@/stores/slayStore';

async function parseRuns(
  allFiles: FileList[],
  character: string | null = null
): Promise<CharacterWinRateDto[]> {
  Loading.show();

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
          const ascensionLevel = fileObject.ascension_level;
          switch (characterChosen) {
            case 'IRONCLAD':
              useFilesStore().ironcladRuns.push(fileObject);
              if (!fileObject.victory) {
                ironclad.loses++;
              } else {
                parseWin(ironclad, ascensionLevel);
              }
              break;
            case 'THE_SILENT':
              useFilesStore().silentRuns.push(fileObject);
              if (!fileObject.victory) {
                silent.loses++;
              } else {
                parseWin(silent, ascensionLevel);
              }
              break;
            case 'DEFECT':
              useFilesStore().defectRuns.push(fileObject);
              if (!fileObject.victory) {
                defect.loses++;
              } else {
                parseWin(defect, ascensionLevel);
              }
              break;
            case 'WATCHER':
              useFilesStore().watcherRuns.push(fileObject);
              if (!fileObject.victory) {
                watcher.loses++;
              } else {
                parseWin(watcher, ascensionLevel);
              }
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
  Loading.hide();
  return [ironclad, silent, defect, watcher];
}

function parseWin(char: CharacterWinRateDto, highestAscension: string) {
  char.wins++;
  if (!char.highestAscensionWon) {
    char.highestAscensionWon = highestAscension;
  } else if (+highestAscension > +char.highestAscensionWon) {
    char.highestAscensionWon = highestAscension;
  }
}

export { parseRuns };
