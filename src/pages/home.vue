<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import {
    CircleUser,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    Logout,
} from 'lucide-vue-next'
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav class="flex flex-col items-center gap-4 px-2 py-4">
                <a href="#"
                    class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                    <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
                    <span class="sr-only">KCB Group</span>
                </a>



                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <RouterLink to="/users"
                                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                <Users2 class="h-5 w-5" />
                                <span class="sr-only">Users</span>
                            </RouterLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Users
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </nav>
            <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <a href="#"
                                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                <Settings class="h-5 w-5" />
                                <span class="sr-only">Logout</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header
                class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger as-child>
                        <Button size="icon" variant="outline" class="sm:hidden">
                            <PanelLeft class="h-5 w-5" />
                            <span class="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="sm:max-w-xs">
                        <nav class="grid gap-6 text-lg font-medium">
                            <a href="#"
                                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                                <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                                <span class="sr-only">KCB Group</span>
                            </a>

                            <RouterLink to="/users"
                                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <Users2 class="h-5 w-5" />
                                Users
                            </RouterLink>
                            <a href="#"
                                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                <LineChart class="h-5 w-5" />
                                Logout
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>

                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..."
                        class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
                </div>

            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div class="flex items-center">

                    <div class="ml-auto flex items-center gap-2">
                        <Button size="sm" class="h-7 gap-1">
                            <PlusCircle class="h-3.5 w-3.5" />
                            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add User
                            </span>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                            Manage your users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead class="hidden w-[100px] sm:table-cell">
                                        <span class="sr-only">img</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead class="hidden md:table-cell">
                                        Price
                                    </TableHead>
                                    <TableHead class="hidden md:table-cell">
                                        Total Sales
                                    </TableHead>
                                    <TableHead class="hidden md:table-cell">
                                        Created at
                                    </TableHead>
                                    <TableHead>
                                        <span class="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell class="hidden sm:table-cell">
                                        <img alt="Product image" class="aspect-square rounded-md object-cover"
                                            height="64" src="@/assets/vue.svg" width="64">
                                    </TableCell>
                                    <TableCell class="font-medium">
                                        Laser Lemonade Machine
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            Draft
                                        </Badge>
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">
                                        $499.99
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">
                                        25
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">
                                        2023-07-12 10:42 AM
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger as-child>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal class="h-4 w-4" />
                                                    <span class="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>

                </Card>
            </main>
        </div>
    </div>
</template>