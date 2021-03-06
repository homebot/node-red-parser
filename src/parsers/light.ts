import Light from "../interfaces/parser/Light";
import { Types } from "../interfaces/CommandTypes";
import { PorterStemmerRu } from "natural";

export const parsers: Array<{
  matcher: (text: string) => boolean;
  value: (text: string) => Light;
  type: Types;
}> = [
  /**
   * Включить свет на кухне
   */
  {
    matcher: (text: string) => {
      return text.search(/^вкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
    },
    value: (text: string) => {
      const where = text
        .split(" ")
        .slice(-1)[0]
        .replace(".", "");

      return {
        text,
        command: "включить",
        target: "свет",
        where: [PorterStemmerRu.stem(where)]
      };
    },
    type: Types.Light
  },

  /**
   * Выключить свет на кухне
   */
  {
    matcher: (text: string) => {
      return text.search(/^выкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
    },
    value: (text: string) => {
      const where = text
        .split(" ")
        .slice(-1)[0]
        .replace(".", "");

      return {
        text,
        command: "выключить",
        target: "свет",
        where: [PorterStemmerRu.stem(where)]
      };
    },
    type: Types.Light
  },

  /**
   * Включить свет
   */
  {
    matcher: (text: string) => {
      return text.search(/^вкл[а-я]* свет.?$/i) !== -1;
    },
    value: (text: string) => {
      return {
        text,
        command: "включить",
        target: "свет",
        where: []
      };
    },
    type: Types.Light
  },

  /**
   * Выключить свет
   */
  {
    matcher: (text: string) => {
      return text.search(/^выкл[а-я]* свет.?$/i) !== -1;
    },
    value: (text: string) => {
      return {
        text,
        command: "выключить",
        target: "свет",
        where: []
      };
    },
    type: Types.Light
  }
];
