export const tokenName = "auth_token";

export interface StatusOptionDto {
    label: string;
    value: "Active" | "InActive"
}

export const statusOptions: StatusOptionDto[] = [
    { label: "ເຄື່ອນໄຫວ", value: "Active" },
    { label: "ບໍ່ເຄື່ອນໄຫວ", value: "InActive" }
];