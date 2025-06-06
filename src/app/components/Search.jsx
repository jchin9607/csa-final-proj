"use client";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  CommandDialog,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { usePathname } from "next/navigation";
import { login } from "./login";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

const Search = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [access_token, setAccessToken] = useState("");

  async function getTracks(search) {
    let trackList = [];

    if (access_token === "") {
      const token = await login(code);

      setAccessToken(token);
    }

    const tokenURL = `https://api.spotify.com/v1/search?q=${search}&type=track`;

    const response = await axios.get(tokenURL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    trackList = response.data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists[0].name,
      uri: track.uri,
    }));
    return trackList;
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (value) {
      getTracks(value).then((data) => {
        setTracks(data);
      });
    }
  }, [value]);

  async function playTrack(uri) {
    if (access_token === "") {
      const token = await login(code);

      setAccessToken(token);
    }
    const tokenURL = `https://api.spotify.com/v1/me/player/play`;
    const body = {
      uris: [uri],
    };

    const response = await axios.put(
      tokenURL,
      { uris: [uri] },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  }
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <SearchIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 " />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        showCloseButton={false}
      >
        {/* <CommandInput
          placeholder="Type to search..."
          value={value}
          onValueChange={setValue}
        /> */}
        <div className="flex h-9 items-center gap-2 border-b px-3">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <Input
            placeholder="Type to search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 border-0 "
          />
        </div>

        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandGroup heading="Top Results">
            {tracks?.map((track) => (
              <CommandItem
                key={track?.uri}
                value={track?.uri}
                onSelect={() => playTrack(track?.uri)}
              >
                {track?.name} - {track?.artist}
              </CommandItem>
            ))}
          </CommandGroup>
          {/* <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
