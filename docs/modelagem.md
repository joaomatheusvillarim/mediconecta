```
User
---
+ id: number
+ name: string
+ email: string
+ password: string
+ cpf: string
+ birthday: Date
+ sex: UserSex
+ address: string
+ phone: string
---
---

Clinic
---
+ id: number
+ adminId: number
+ name: string
+ address: string
+ workingHours: string
+ specialties: string
+ phone: string
+ email: string
---
---

Patient
---
+ id: number
+ userId: number
+ clinicId: number
---
---

Record
---
+ id: number
+ patientId: number
+ clinicId: number
+ entries: JSON[]
---
---

Doctor
---
+ id: number
+ userId: number
+ clinicId: number
+ credentials: string
+ workingHours: string
+ specialty: string
+ insurance: string
---
---

Secretary
---
+ id: number
+ userId: number
+ clinicId: number
+ workingHours: string
---
---

Appointment
---
+ id: number
+ clinicId: number
+ doctorId: number
+ patientId: number
+ status: AppointmentStatus
+ date: Date
+ price: double
+ insurance: str
---
---

Announcement
---
+ id: number
+ title: str
+ text: str
+ authorId: number
+ date: Date
---
---

```