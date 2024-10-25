<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router';
import { onMounted, ref } from "vue";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from "lucide-vue-next";

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
    LogOut,
} from 'lucide-vue-next'
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { logoutUser } from "@/services/apiService";
import { getUsers, createUser, editUser, searchUser } from "@/services/userService";

const router = useRouter();

function handleLogout() {
    logoutUser();
    router.push('/login');
}

const search = ref('')

// const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//         if (timeoutId) clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func(...args);
//         }, delay);
//     };
// };


async function handleSearch() {
    if (search.value === '') {
        users.value = await getUsers();
        return;
    }
    users.value = await searchUser(search.value);
}

// const handleSearch = debounce(async () => {
//     users.value = await searchUser(search.value);
// }, 300);

const user = ref({})
const users = ref([])

const { errors, handleSubmit, defineField, isSubmitting } = useForm({
    validationSchema: yup.object({
        usrFirstname: yup.string().required(),
        usrLastname: yup.string().required(),
        usrUsername: yup.string().required(),
    }),
});

const [usrFirstname, usrFirstnameAttrs] = defineField('usrFirstname');
const [usrLastname, usrLastnameAttrs] = defineField('usrLastname');
const [usrUsername, usrUsernameAttrs] = defineField('usrUsername');

const onSubmit = handleSubmit(async values => {
    const response = await createUser(values);
    await _getUsers()
});


const message = ref('');
const loading = ref(false);

async function _getUsers() {
    try {
        users.value = await getUsers();
    } catch (error) {
        throw new Error("Error fetching users");
    }
}

onMounted(async () => {
    loading.value = true
    try {
        user.value = JSON.parse(localStorage.getItem('user') || '{}');
        await _getUsers();
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <aside class="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
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
            <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4 cursor-pointer" @click="handleLogout">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="icon" size="sm" class="bg-primary text-white">
                                <LogOut class="h-5 w-5" />
                                
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-20">
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
                            <Button @click="handleLogout"
                                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                                Logout
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>

                {{ user?.usrFirstname }} {{ user?.usrLastname }}

                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." v-model="search" @input="handleSearch"
                        class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
                </div>


            </header>
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div class="flex items-center">

                    <div class="ml-auto flex items-center gap-2">

                        <Dialog>
                            <DialogTrigger>
                                <Button size="sm" class="h-7 gap-1">
                                    <PlusCircle class="h-3.5 w-3.5" />
                                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add User
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add User</DialogTitle>
                                </DialogHeader>

                                <form class="grid gap-4" @submit.prevent="onSubmit">
                                    <div class="grid gap-2">
                                        <Label for="usrFirstname">usrFirstname</Label>
                                        <Input id="usrFirstname" type="text" placeholder="" v-model="usrFirstname"
                                            v-bind="usrFirstnameAttrs" required />
                                        <div class="text-red-500">{{ errors.usrFirstname }}</div>
                                    </div>

                                    <div class="grid gap-2">
                                        <Label for="usrLastname">usrLastname</Label>
                                        <Input id="usrLastname" type="text" placeholder="" v-model="usrLastname"
                                            v-bind="usrFirstnameAttrs" required />
                                        <div class="text-red-500">{{ errors.usrLastname }}</div>
                                    </div>

                                    <div class="grid gap-2">
                                        <Label for="usrUsername">usrUsername</Label>
                                        <Input id="usrUsername" type="text" placeholder="" v-model="usrUsername"
                                            v-bind="usrUsernameAttrs" required />
                                        <div class="text-red-500">{{ errors.usrUsername }}</div>
                                    </div>


                                    <Alert variant="destructive" v-if="message != ''">
                                        <AlertCircle class="w-4 h-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {{ message }}
                                        </AlertDescription>
                                    </Alert>
                                    <Button type="submit" class="w-full" :disabled="isSubmitting">
                                        {{ isSubmitting ? 'Submitting...' : 'Add User' }}
                                    </Button>
                                </form>

                                <DialogFooter>

                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


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
                                    <TableHead class="hidden md:table-cell">Username</TableHead>
                                    <TableHead class="hidden md:table-cell">Created at</TableHead>
                                    <TableHead>
                                        <span class="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody v-if="loading" class="w-full h-4xl">
                                <TableRow v-for="n in 5" :key="n" class="animate-pulse ">
                                    <TableCell class="hidden sm:table-cell">
                                        <div class="h-16 w-16 bg-gray-300 rounded-md"></div>
                                    </TableCell>
                                    <TableCell class="font-medium">
                                        <div class="h-6 bg-gray-300 rounded-md w-3/4"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div class="h-6 bg-gray-300 rounded-md w-1/2"></div>
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">
                                        <div class="h-6 bg-gray-300 rounded-md w-1/2"></div>
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">
                                        <div class="h-6 bg-gray-300 rounded-md w-1/2"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div class="h-6 bg-gray-300 rounded-md w-1/4"></div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody v-else>
                                <TableRow v-for="user in users" :key="user.usrId">
                                    <TableCell class="hidden sm:table-cell">
                                        <img alt="User image" class="aspect-square rounded-md object-cover" height="64"
                                            src="@/assets/vue.svg" width="64">
                                    </TableCell>
                                    <TableCell class="font-medium">{{ user.usrFirstname }} {{ user.usrLastname }}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{{ user.usrStatus }}</Badge>
                                    </TableCell>
                                    <TableCell class="hidden md:table-cell">{{ user.usrUsername }}</TableCell>
                                    <TableCell class="hidden md:table-cell">{{ new Date(user.usrCdate).toLocaleString()
                                        }}</TableCell>
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

                                                <Dialog id="edit">
                                                    <DialogTrigger>
                                                        <DropdownMenuItem>Edit User</DropdownMenuItem>

                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Add User</DialogTitle>
                                                        </DialogHeader>

                                                        <form class="grid gap-4" @submit.prevent="onSubmit">
                                                            <div class="grid gap-2">
                                                                <Label for="usrFirstname">usrFirstname</Label>
                                                                <Input id="usrFirstname" type="text" placeholder=""
                                                                    v-model="usrFirstname" v-bind="usrFirstnameAttrs"
                                                                    required />
                                                                <div class="text-red-500">{{ errors.usrFirstname }}
                                                                </div>
                                                            </div>

                                                            <div class="grid gap-2">
                                                                <Label for="usrLastname">usrLastname</Label>
                                                                <Input id="usrLastname" type="text" placeholder=""
                                                                    v-model="usrLastname" v-bind="usrFirstnameAttrs"
                                                                    required />
                                                                <div class="text-red-500">{{ errors.usrLastname }}</div>
                                                            </div>

                                                            <div class="grid gap-2">
                                                                <Label for="usrUsername">usrUsername</Label>
                                                                <Input id="usrUsername" type="text" placeholder=""
                                                                    v-model="usrUsername" v-bind="usrUsernameAttrs"
                                                                    required />
                                                                <div class="text-red-500">{{ errors.usrUsername }}</div>
                                                            </div>


                                                            <Alert variant="destructive" v-if="message != ''">
                                                                <AlertCircle class="w-4 h-4" />
                                                                <AlertTitle>Error</AlertTitle>
                                                                <AlertDescription>
                                                                    {{ message }}
                                                                </AlertDescription>
                                                            </Alert>
                                                            <Button type="submit" class="w-full"
                                                                :disabled="isSubmitting">
                                                                {{ isSubmitting ? 'Submitting...' : 'Add User' }}
                                                            </Button>
                                                        </form>

                                                        <DialogFooter>

                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
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