export type User = {
  avatars: Avatars | null
  activity_field: string | null
  // birth_date: string | null
  // birth_date_view: string
  company_name: string | null
  // department: { id: number; name: string } | null
  // emails: {
  //   type: string
  //   label: string
  //   read_only: boolean
  //   value: string
  //   is_visible: boolean
  // }[]
  // expired_vacations: {
  //   date_from: string
  //   year_from: number
  //   date_to: string
  //   duration_days: number
  // }[]
  // extra: {
  //   hobby?: string
  //   device?: string
  //   job_before?: string
  //   shirt_size?: string
  //   favorite_sport?: string
  // }
  // extra_private: {
  //   extra_contact_name: string
  //   extra_contact_relation: string
  //   extra_contact_phone: string
  // }
  // firing_date: null | string
  first_name: string
  // full_name: string
  // full_name_with_middlename: string
  // gleg: string
  gender: "F" | "M" | null
  // groups: string[]
  // hiring_date: string | null
  id: number
  // is_active: boolean
  // is_business_account: boolean
  // is_fired: boolean
  // is_gph: boolean
  // is_manager: boolean
  // is_notification_sound_enabled: boolean
  last_name: string
  // location: string | null
  // locations: {
  //   id: number
  //   place: string
  //   location: string
  //   url: string
  //   is_main: boolean
  // }[]
  // middle_name: string | null
  // manager: { id: number; first_name: string; last_name: string } | null
  // map_info: {
  //   floor_id: number | null
  //   map_object_item_id: number | null
  //   place_id: number | null
  // }
  // messengers: {
  //   id: number
  //   is_visible: boolean
  //   label: string
  //   type: string
  //   value: string
  // }[]
  // on_maternity_leave: boolean
  // permissions: string[]
  // phones: {
  //   type: string
  //   label: string
  //   read_only: boolean
  //   value: string
  //   is_visible: boolean
  // }[]
  // planned_vacations: {
  //   start: string
  //   end: string
  // }[]
  post: string | null
  // primary_email: string
  // projects: {
  //   id: number
  //   name: string
  //   role: string
  //   url: null // null всегда 🤷‍♂️
  // }[]
  // recruit_id: number | null
  // social_networks: {
  //   type: string
  //   label: string
  //   read_only: boolean
  //   value: string
  //   is_visible: boolean
  // }[]
  // structure_projects: {
  //   id: number
  //   guid: string
  //   name: string
  // }[]
  // subscriptions: {
  //   id: number
  //   description: string | null
  //   info: string | null
  //   is_active: boolean
  // }[]
  // ui_theme: string
  // url: string
  // user_way_status: string | null
  username: string
  // vacation_days_count?: number | null
  // vacation_status: null | string
  // vacations: {
  //   id: number
  //   date_from: string
  //   date_to: string
  //   is_self_payed: boolean
  //   substitute_worker: {
  //     id: number
  //     fullname: string
  //   } | null
  //   status: string
  // }[]
}

export type Avatars = {
  small?: string
  big?: string
  huge?: string
  original?: string
  mini?: string
}
