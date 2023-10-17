import { type SettingsType } from '../../game/types';
import { resumeEvent } from '../../utils/events';
import Button from '../button/button';
import Control from '../control';
import CheckInput from '../inputs/check-input';
import RadioInput from '../inputs/radio-input';
import RangeInput from '../inputs/range-input';
import PopUp from '../pop-up/pop-up';

class SettingsMenu extends PopUp {
  data: SettingsType;
  form: Control<HTMLFormElement>;
  onSave: (data: SettingsType) => void;
  constructor (data: SettingsType) {
    super();
    this.data = data;
    const menu = new Control(this.node, 'div', 'menu__conteiner', 'Настройки');
    const form = new Control(menu.node, 'form', 'settings__form');
    const musicField = new Control(form.node, 'fieldset', 'settings__fieldset');
    const musicChecbox = new CheckInput(musicField.node, 'Музыка');
    musicChecbox.node.checked = this.data.isMusic;
    const musicRange = new RangeInput(musicField.node, 'music', this.data.music.toString(), this.data.isMusic);
    musicChecbox.node.onchange = () => {
      musicRange.setIsDisable(!musicChecbox.node.checked);
      this.data.isMusic = musicChecbox.node.checked;
    };
    musicRange.node.onchange = () => {
      this.data.music = Number(musicRange.node.value);
    };
    const soundsField = new Control(form.node, 'fieldset', 'settings__fieldset');
    const soundsChecbox = new CheckInput(soundsField.node, 'Звуки');
    soundsChecbox.node.checked = this.data.isSounds;
    const soundsRange = new RangeInput(soundsField.node, 'sounds', this.data.sounds.toString(), this.data.isSounds);
    soundsChecbox.node.onchange = () => {
      soundsRange.setIsDisable(!soundsChecbox.node.checked);
      this.data.isSounds = soundsChecbox.node.checked;
    };
    soundsRange.node.onchange = () => {
      this.data.sounds = soundsRange.node.valueAsNumber;
    };
    const hardnessField = new Control(form.node, 'fieldset', 'settings__fieldset', 'Уровень сложности');
    hardnessField.node.classList.add('settings__fieldset-level');
    ['easy', 'norm', 'hard'].forEach((el) => {
      const input = new RadioInput(hardnessField.node, 'hardness', el);
      input.node.checked = this.data.hardness === el;
      input.node.onchange = () => {
        this.data.hardness = el;
      };
    });
    const languageField = new Control(form.node, 'fieldset', 'settings__fieldset', 'Язык');
    languageField.node.classList.add('settings__fieldset-language');
    ['ru', 'en'].forEach((el) => {
      const input = new RadioInput(languageField.node, 'language', el);
      input.node.checked = this.data.hardness === el;
      input.node.onchange = () => {
        this.data.language = el;
      };
    });
    const saveBtn = new Button(menu.node, 'Save');
    saveBtn.node.onclick = () => {
      dispatchEvent(resumeEvent);
      this.onSave(this.data);
    };
    const canselBtn = new Button(menu.node, 'Cancel');
    canselBtn.node.onclick = () => {
      dispatchEvent(resumeEvent);
      this.destroy();
    };
  }
}

export default SettingsMenu;
