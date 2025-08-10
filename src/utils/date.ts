// src/utils/date.ts
//
// @file 날짜 유틸리티 함수
// @description 날짜 관련 작업을 처리하는 유틸리티 함수들을 제공합니다.
//              현재는 Date 객체를 특정 형식의 문자열로 포맷하는 함수를 포함합니다.
// @version 1.0.0

/**
 * @function formatDate
 * @description 주어진 Date 객체를 "Month Day, Year" 형식의 문자열로 포맷합니다.
 * @param {Date} date - 포맷할 Date 객체.
 * @returns {string} 예: 2023년 7월 14일 -> "July 14, 2023"
 * @example
 * const myDate = new Date('2023-07-14');
 * formatDate(myDate); // "July 14, 2023"
 */
export function formatDate(date: Date): string {
  // `toLocaleDateString` 메서드를 사용하여 지역화된 날짜 문자열을 생성합니다.
  // "en-US" 로케일을 지정하여 월, 일, 연도 순서로 표시하도록 합니다.
  return date.toLocaleDateString("en-US", {
    year: "numeric", // 연도를 숫자로 표시합니다 (e.g., 2023).
    month: "long",   // 월을 전체 이름으로 표시합니다 (e.g., July).
    day: "numeric",  // 일을 숫자로 표시합니다 (e.g., 14).
  });
}