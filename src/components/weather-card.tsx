'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Wind, Terminal } from 'lucide-react';
import { getWeather } from '@/app/actions';
import type { WeatherState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherDisplay } from './weather-display';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: WeatherState = {
  data: null,
  error: null,
  input: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Getting Weather...
        </>
      ) : 'Get Weather'}
    </Button>
  );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-lg border bg-background/50 p-4">
                    <Skeleton className="mx-auto h-8 w-8 rounded-md" />
                    <Skeleton className="mx-auto h-6 w-16" />
                    <Skeleton className="mx-auto h-4 w-20" />
                </div>
                <div className="space-y-2 rounded-lg border bg-background/50 p-4">
                    <Skeleton className="mx-auto h-8 w-8 rounded-md" />
                    <Skeleton className="mx-auto h-6 w-20" />
                    <Skeleton className="mx-auto h-4 w-24" />
                </div>
            </div>
        </div>
    );
}

export function WeatherCard() {
  const [state, formAction, isPending] = useActionState(getWeather, initialState);

  return (
    <Card className="w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
            <Wind className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">Weatherwise</CardTitle>
        </div>
        <CardDescription>Enter a city to get the latest weather forecast</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Input 
            name="city" 
            placeholder="e.g., London, Paris, New York" 
            className="text-center" 
            required
            defaultValue={state.input} 
          />
        </CardContent>
        <CardFooter>
            <SubmitButton />
        </CardFooter>
      </form>
      <CardContent>
        {isPending && <LoadingSkeleton />}
        {!isPending && state.data && <WeatherDisplay data={state.data} />}
        {!isPending && state.error && (
           <Alert variant="destructive" className="animate-in fade-in-0 duration-300">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>
               {state.error}
             </AlertDescription>
           </Alert>
        )}
        {!isPending && !state.data && !state.error && (
          <div className="text-center text-muted-foreground p-8">
            <p>Your weather awaits!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
