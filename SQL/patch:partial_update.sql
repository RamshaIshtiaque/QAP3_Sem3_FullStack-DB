UPDATE user_addresses 
SET 
    address_line1 = COALESCE('456 Maple Ave', address_line1),
    address_line2 = COALESCE(NULL, address_line2),
    city = COALESCE(NULL, city),
    state = COALESCE(NULL, state),
    postal_code = COALESCE('M6K 1K4', postal_code),
    country = COALESCE(NULL, country)
WHERE id = 1;


