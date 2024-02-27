import { CharacterWinRateDto } from '@/dtos/CharacterWinRateDto';
import { DetailedCharacterDto } from '@/dtos/DetailedCharacterDto';

async function detailedParse(
  allFiles: FileList[],
  character: CharacterWinRateDto
): Promise<DetailedCharacterDto> {
  const newChar: DetailedCharacterDto = {
    name: character.name,
  } as DetailedCharacterDto;

  async function readFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const fileContent = JSON.parse(event.target.result as string);
          if (fileContent.character_chosen !== newChar.name) return;

          newChar.runTimeInSeconds = fileContent.playtime;
          newChar.score = fileContent.score;
          newChar.floorReached = fileContent.floor_reached;
          newChar.isAscension = fileContent.is_ascension_mode;
          newChar.seed = fileContent.seed_played;
          newChar.victory = fileContent.victory;
          newChar.killedBy = fileContent.killed_by;
          resolve();
        }
      };
      reader.readAsText(file);
    });
  }
  // Read all files asynchronously
  await Promise.all(Array.from(allFiles).map((file) => readFile(file)));
  return newChar;
}

export { detailedParse };
