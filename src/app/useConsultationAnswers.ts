import { useEffect, useState } from 'react';
import type { AnswerDraft, Concern, CurrentHair, DesiredBrightness, Impression, Priority, PlanPreference } from '../domain/types';
import { questions } from '../data/questions';

const storageKey = 'lumina.answers.v1';
function restore(): AnswerDraft {
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? '{}');
    if (typeof stored === 'object' && stored !== null) {
      const restored: AnswerDraft = {};
      if ('impression' in stored) {
        const option = questions[0].options.find(option => option.value === stored.impression);
        if (option) restored.impression = option.value;
      }
      if ('concerns' in stored && Array.isArray(stored.concerns)) {
        restored.concerns = [];
        for (const value of stored.concerns) {
          const option = questions[1].options.find(option => option.value === value);
          if (option && !restored.concerns.includes(option.value)) restored.concerns.push(option.value);
        }
        restored.concerns = restored.concerns.slice(0, questions[1].maxSelections);
      }
      if ('currentHair' in stored) {
        const value = stored.currentHair === 'light' ? 'light_brown' : stored.currentHair;
        const option = questions[2].options.find(option => option.value === value);
        if (option) restored.currentHair = option.value;
      }
      if ('desiredBrightness' in stored) {
        const option = questions[3].options.find(option => option.value === stored.desiredBrightness);
        if (option) restored.desiredBrightness = option.value;
      }
      if ('priority' in stored) {
        const option = questions[4].options.find(option => option.value === stored.priority);
        if (option) restored.priority = option.value;
      }
      if ('planPreference' in stored) {
        const option = questions[5].options.find(option => option.value === stored.planPreference);
        if (option) restored.planPreference = option.value;
      }
      return restored;
    }
  } catch { /* 保存が利用できない環境でもメモリー内で診断を続ける。 */ }
  return {};
}
export function useConsultationAnswers() {
  const [answers, setAnswers] = useState<AnswerDraft>(restore);
  useEffect(() => {
    try { if (Object.keys(answers).length === 0) sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, JSON.stringify(answers)); } catch { /* memory fallback */ }
  }, [answers]);
  function setImpression(impression: Impression) {
    setAnswers(current => ({ ...current, impression }));
  }
  function toggleConcern(concern: Concern) {
    setAnswers(current => {
      const selected = current.concerns ?? [];
      if (selected.includes(concern)) return { ...current, concerns: selected.filter(id => id !== concern) };
      if (selected.length >= questions[1].maxSelections) return current;
      return { ...current, concerns: [...selected, concern] };
    });
  }
  function setCurrentHair(currentHair: CurrentHair) {
    setAnswers(current => ({ ...current, currentHair }));
  }
  function setDesiredBrightness(desiredBrightness: DesiredBrightness) {
    setAnswers(current => ({ ...current, desiredBrightness }));
  }
  function setPriority(priority: Priority) {
    setAnswers(current => ({ ...current, priority }));
  }
  function setPlanPreference(planPreference: PlanPreference) {
    setAnswers(current => ({ ...current, planPreference }));
  }
  function resetAnswers() {
    try { sessionStorage.removeItem(storageKey); } catch { /* memory fallback */ }
    setAnswers({});
  }
  return { answers, resetAnswers, setPlanPreference, setPriority, setDesiredBrightness, setImpression, toggleConcern, setCurrentHair };
}
