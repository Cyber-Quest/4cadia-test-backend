import { JwtModule } from '@nestjs/jwt'; 
import "dotenv/config" 

export const JwtConfig = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1000000000s' },
});
