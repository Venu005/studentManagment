import { headers, cookies } from "next/headers";
export function getTeacherData() {
  const teacherDataHeader = headers().get("x-teacher-data");
  if (teacherDataHeader) {
    return JSON.parse(teacherDataHeader);
  }
  const teacherDataCookie = cookies().get("teacher-data");
  if (teacherDataCookie) {
    return JSON.parse(teacherDataCookie);
  }
  return null;
}
