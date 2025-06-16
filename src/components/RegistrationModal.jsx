import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';



const RegisterModal = ({ open, onOpenChange }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username.trim() || !email.trim() || !password || !passwordConfirmation) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return;
      }
      if (password !== passwordConfirmation) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }

       dispatch(registerUser({
            username, email, password, passwordConfirmation,
          }))
            .then((response) => {
              // Check if the response status is 200
              if (response.type === 'auth/registerUser/fulfilled') {
                toast.success("Registration successful!");
                onOpenChange(false);
                navigate('/vehicles');
              } else {
               toast.error("Registration failed.");
          }
        })
    .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-500">Register</DialogTitle>
          <DialogDescription>
            Create a new account to access our vehicle reservation system
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRegister}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-red-200 focus:border-red-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-red-200 focus:border-red-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-red-200 focus:border-red-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="border-red-200 focus:border-red-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full text-white bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
