package io.github.manishdait.aquila.auth.jwt;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JwtProvider {
    private static final String SECRET_KEY = "815F1298534CA2989B84C1C2F48D4609E7A05811E0700653661466A6";

    public String generateToken(String username) {
        return Jwts.builder().setClaims(new HashMap<>())
            .setSubject(username)
            .setIssuedAt(Date.from(Instant.now()))
            .setExpiration(Date.from(Instant.now().plusSeconds(900)))
            .signWith(getKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    private Key getKey() {
        byte[] decodedKey = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    private Claims getClaims(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims;
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    private Date extractExpiration(String token) {
        return getClaims(token).getExpiration();
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        if (username.equals(userDetails.getUsername()) && !isTokenExpire(token)) {
            return true;
        }
        return false;
    }

    private boolean isTokenExpire(String token) {
        return extractExpiration(token).before(new Date());
    }
}
