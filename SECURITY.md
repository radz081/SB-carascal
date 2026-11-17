# Security Guidelines

## 🔒 Security Status

**Current Status**: ⚠️ **IN REMEDIATION**

The application is undergoing security hardening. Several critical vulnerabilities have been identified and are being fixed.

## Known Security Issues

### Critical (P0)
- [ ] SQL Injection vulnerabilities in ~145+ endpoints
- [ ] Plain text password storage
- [ ] Missing CSRF protection

### High (P1)
- [ ] Hardcoded database credentials
- [ ] Insufficient input validation
- [ ] Missing rate limiting
- [ ] Weak session management

### Medium (P2)
- [ ] File upload vulnerabilities
- [ ] Information disclosure in error messages
- [ ] CORS misconfiguration
- [ ] Missing security headers

## Security Fixes Completed

### ✅ Completed
1. Created secure database functions with parameterized queries
2. Added input validation utilities
3. Fixed authentication SQL injection (already secure)
4. Fixed personal info management functions
5. Fixed gallery display SQL injection
6. Created security scanning tool

## Development Security Guidelines

### 1. Database Queries

**❌ NEVER DO THIS:**
```python
sql = f"SELECT * FROM users WHERE id='{user_id}'"
sql = "DELETE FROM items WHERE id='" + item_id + "'"
```

**✅ ALWAYS DO THIS:**
```python
sql = "SELECT * FROM users WHERE id=%s"
result = pyread_safe(sql, (user_id,))

sql = "DELETE FROM items WHERE id=%s"
cud_safe(sql, (item_id,))
```

### 2. Input Validation

**Always validate and sanitize user input:**
```python
# Validate integers
user_id = validate_int(request_data.get('id', 0))
if user_id <= 0:
    return jsonify({"error": "Invalid ID"}), 400

# Validate strings
username = validate_string(request_data.get('username', ''), max_length=50)

# Validate email
email = validate_string(request_data.get('email', ''), max_length=100)
if not validate_email(email):
    return jsonify({"error": "Invalid email format"}), 400
```

### 3. Authentication Required

**All sensitive endpoints must require authentication:**
```python
@query.route('/sensitive_endpoint', methods=['POST'])
@login_required
def sensitive_endpoint():
    # Your code here
    pass
```

### 4. File Uploads

**Validate file uploads properly:**
```python
from werkzeug.utils import secure_filename

if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    # Additional validation
    if file.content_length > MAX_FILE_SIZE:
        return jsonify({"error": "File too large"}), 400
```

### 5. Error Handling

**Don't expose system details in errors:**
```python
# ❌ DON'T
except Exception as e:
    return jsonify({"error": str(e)}), 500

# ✅ DO
except Exception as e:
    logger.error(f"Error in function_name: {e}")
    return jsonify({"error": "An error occurred"}), 500
```

## Password Security

### Current Issue
Passwords are stored in plain text. This must be changed immediately.

### Required Fix
```python
from werkzeug.security import generate_password_hash, check_password_hash

# When creating user
hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

# When verifying
if check_password_hash(stored_hash, provided_password):
    # Login successful
```

## Environment Variables

### Setup
1. Copy `.env.example` to `.env`
2. Update all values with actual credentials
3. Never commit `.env` to version control

### Usage in Code
```python
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
```

## Security Testing

### Running Security Scan
```bash
python fix_sql_injection.py
```

### Manual Testing Checklist
- [ ] Test SQL injection with `' OR '1'='1`
- [ ] Test XSS with `<script>alert('XSS')</script>`
- [ ] Test file upload with executable files
- [ ] Test authentication bypass attempts
- [ ] Test CSRF attacks
- [ ] Test rate limiting

### Automated Tools
```bash
# Install tools
pip install bandit safety

# Run security scans
bandit -r application/ models/
safety check
```

## HTTPS/SSL

**In production, always use HTTPS:**
- Obtain SSL certificate (Let's Encrypt is free)
- Configure web server (Nginx/Apache) for HTTPS
- Redirect all HTTP to HTTPS
- Set secure cookie flags

## Security Headers

Add these headers to all responses:
```python
@app.after_request
def set_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response
```

## Incident Response

### If Security Breach Suspected:
1. **Isolate** - Take system offline if necessary
2. **Assess** - Determine scope of breach
3. **Contain** - Patch vulnerability immediately
4. **Notify** - Inform affected users and authorities if required
5. **Review** - Conduct post-mortem and update procedures

### Contact
For security concerns, contact: [Your Security Contact]

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Python Security Best Practices](https://python.readthedocs.io/en/stable/library/security_warnings.html)
- [Flask Security](https://flask.palletsprojects.com/en/2.3.x/security/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

## Updates

| Date | Update |
|------|--------|
| 2024-01-XX | Initial security audit completed |
| 2024-01-XX | Secure database functions created |
| 2024-01-XX | Critical functions fixed (5/150) |

---

**Remember**: Security is an ongoing process, not a one-time fix.
