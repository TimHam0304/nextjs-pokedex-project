"use server";
import { BASE_URL, ENDPOINTS } from "@constants";
import { Ability } from "@models/Pokemon/ability";

interface status {
  code: number;
  message: string;
}

interface GetAbilityResponse {
  ability: Ability | null;
  status: status;
}

export async function getAbility(
  nameOrID: string
): Promise<GetAbilityResponse> {
  //the pokeapi.co allows the use of either the name or ID of an ability
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.ABILITY}/${nameOrID}`,
    {
      cache: "force-cache",
      next: { revalidate: 604800 },
    }
  );

  if (!response.ok) {
    return {
      ability: null,
      status: { code: response.status, message: response.statusText },
    };
  }

  const jsonData = (await response.json()) as Ability;
  return {
    ability: jsonData,
    status: { code: response.status, message: response.statusText },
  };
}
