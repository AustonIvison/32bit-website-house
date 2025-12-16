import type { DialogState, NPC } from './types';

export class DialogSystem {
  private state: DialogState = {
    isOpen: false,
    currentNpcId: null,
    currentLineIndex: 0,
    displayedText: '',
    isTyping: false,
  };

  private currentDialog: string[] = [];
  private currentNpcName = '';
  private fullText = '';
  private typewriterIndex = 0;
  private typewriterSpeed = 30; // ms per character
  private lastTypeTime = 0;

  getState(): DialogState {
    return { ...this.state };
  }

  getCurrentNpcName(): string {
    return this.currentNpcName;
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  startDialog(npc: NPC): void {
    this.currentDialog = npc.dialog;
    this.currentNpcName = npc.name;
    this.state.isOpen = true;
    this.state.currentNpcId = npc.id;
    this.state.currentLineIndex = 0;
    this.startLine(0);
  }

  private startLine(index: number): void {
    if (index >= this.currentDialog.length) {
      this.closeDialog();
      return;
    }

    this.fullText = this.currentDialog[index];
    this.typewriterIndex = 0;
    this.state.displayedText = '';
    this.state.isTyping = true;
    this.lastTypeTime = performance.now();
  }

  update(currentTime: number): void {
    if (!this.state.isOpen || !this.state.isTyping) return;

    const elapsed = currentTime - this.lastTypeTime;
    if (elapsed >= this.typewriterSpeed) {
      const charsToAdd = Math.floor(elapsed / this.typewriterSpeed);
      this.typewriterIndex = Math.min(this.typewriterIndex + charsToAdd, this.fullText.length);
      this.state.displayedText = this.fullText.slice(0, this.typewriterIndex);
      this.lastTypeTime = currentTime;

      if (this.typewriterIndex >= this.fullText.length) {
        this.state.isTyping = false;
      }
    }
  }

  advance(): void {
    if (!this.state.isOpen) return;

    if (this.state.isTyping) {
      // Skip to end of current line
      this.state.displayedText = this.fullText;
      this.typewriterIndex = this.fullText.length;
      this.state.isTyping = false;
    } else {
      // Go to next line
      this.state.currentLineIndex++;
      if (this.state.currentLineIndex >= this.currentDialog.length) {
        this.closeDialog();
      } else {
        this.startLine(this.state.currentLineIndex);
      }
    }
  }

  closeDialog(): void {
    this.state.isOpen = false;
    this.state.currentNpcId = null;
    this.state.currentLineIndex = 0;
    this.state.displayedText = '';
    this.state.isTyping = false;
    this.currentDialog = [];
    this.currentNpcName = '';
  }
}
