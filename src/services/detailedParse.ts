import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { DetailedCharacterDto } from '@/dtos/DetailedCharacterDto';
import { Loading } from 'quasar';

async function detailedParse(
  allFiles: FileList[],
  character: CharacterWinRateDto
): Promise<DetailedCharacterDto> {
  Loading.show();
  const newChar: DetailedCharacterDto = {
    name: character.name,
  } as DetailedCharacterDto;

  async function readFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        // console.log('File loaded');
        if (event.target && event.target.result) {
          try {
            const fileContent = JSON.parse(event.target.result as string);
            // console.log('JSON parsed');
            if (fileContent.character_chosen !== newChar.name) {
              resolve(); // Resolve immediately if character doesn't match
            } else {
              newChar.runTimeInSeconds = fileContent.playtime;
              newChar.score = fileContent.score;
              newChar.floorReached = fileContent.floor_reached;
              newChar.isAscension = fileContent.is_ascension_mode;
              newChar.seed = fileContent.seed_played;
              newChar.victory = fileContent.victory;
              newChar.killedBy = fileContent.killed_by;
              resolve();
            }
          } catch (error) {
            // console.error('Error parsing JSON:', error);
            reject(error); // Reject if there's an error parsing JSON
          }
        }
      };
      reader.onerror = (event) => {
        console.error('Error reading file:', event.error);
        reject(event.error); // Reject if there's an error reading the file
      };
      reader.readAsText(file);
    });
  }

  // Read all files asynchronously
  const promises: Promise<void>[] = Array.from(allFiles).map((file) =>
    readFile(file)
  );
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.error('Error reading files:', error);
  }
  Loading.hide();
  return newChar;
}

export { detailedParse };
