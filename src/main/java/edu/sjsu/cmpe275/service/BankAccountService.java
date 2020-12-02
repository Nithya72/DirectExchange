package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.dao.BankAccount;
import edu.sjsu.cmpe275.dao.User;
import edu.sjsu.cmpe275.repository.BankAccountRepository;
import edu.sjsu.cmpe275.repository.UserRepository;
import edu.sjsu.cmpe275.representation.BankAccountCreateRepresentation;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Slf4j
public class BankAccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private UserRepository userRepository;

    private static String regex = "^[a-zA-Z0-9/-]+$";
    private static Pattern alphaNumericPattern = Pattern.compile(regex);

    public ResponseEntity<?> getUserAccounts(@NonNull long userId) {

        List<BankAccount> bankAccounts = bankAccountRepository.findByUserUserId(userId);
        if (bankAccounts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User has not created a bank account yet");
        }
        return ResponseEntity.status(HttpStatus.OK).body(bankAccounts);
    }

    // at time of add, do a call to even change valid type
    public ResponseEntity<?> addAccount(@NonNull long userId, BankAccountCreateRepresentation userAccount) {

//        if (!StringUtils.hasText(nickName)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NickName cannot be null");
//        }
//        if (!alphaNumericPattern.matcher(nickName).matches()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NickName should be alpha-numeric");
//        }

        User user = userRepository.findByUserId(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if(userAccount.getAccountNumber() == null || userAccount.getBankName() == null ||
                userAccount.getCountry() == null || userAccount.getFeatures() == null ||
                userAccount.getOwnerAddress()== null || userAccount.getOwnerName()== null ||
                userAccount.getPrimaryCurrency()== null ||
        userAccount.getAccountNumber().trim().isEmpty() || userAccount.getBankName().trim().isEmpty() ||
        userAccount.getCountry().trim().isEmpty() || userAccount.getFeatures().trim().isEmpty() ||
        userAccount.getOwnerAddress().trim().isEmpty() || userAccount.getOwnerName().trim().isEmpty() ||
        userAccount.getPrimaryCurrency().trim().isEmpty() ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please provide all fields");
        }

        BankAccount newBankAccount = new BankAccount();
        newBankAccount.setAccountNumber(userAccount.getAccountNumber());
        newBankAccount.setBankName(userAccount.getBankName());
        newBankAccount.setCountry(userAccount.getCountry());
        newBankAccount.setFeatures(userAccount.getFeatures());
        newBankAccount.setOwnerAddress(userAccount.getOwnerAddress());
        newBankAccount.setOwnerName(userAccount.getOwnerName());
        newBankAccount.setPrimaryCurrency(userAccount.getPrimaryCurrency());
        newBankAccount.setUser(user);

        bankAccountRepository.save(newBankAccount);

//        List<String> banks = bankAccountRepository.fetchCountriesByUserID(userId);
//        if(!banks.contains(userAccount.getCountry())) {
//            user.setValidUser(true);
//            userRepository.save(user);
//        }

        return ResponseEntity.status(HttpStatus.OK).body(newBankAccount);
    }
}
