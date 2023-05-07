package utils

import (
	"bytes"
	"encoding/base64"
	"image/jpeg"
	"image/png"
	"log"
	"os"
	"strings"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func ServeFrames(data string) string{
    var image string;
    var path string = "static/"

    idx := strings.Index(data, ";base64,")
    if idx < 0 {
        log.Println("Invalid Image")
    }
    
    ImageType := data[11:idx]

    unbased, err := base64.StdEncoding.DecodeString(data[idx+8:])

    if err != nil {
        log.Println(err)
    }

    r := bytes.NewReader(unbased)

    switch ImageType {
      // If image is PNG
        case "png":
        im, err := png.Decode(r)
        if err != nil {
            log.Println(err)
        }

        newName := path + uuid.New().String() + ".png"
        f, err := os.Create(newName)
        
        if err != nil {
            log.Println("Cannot open file")
        }
        image  = strings.Split(f.Name(), "/")[1]

        png.Encode(f, im)

        // If image is JPEG
        case "jpeg":
        im, err := jpeg.Decode(r)
        if err != nil {
            log.Println("badJPEF")
        }

        newName := path + uuid.New().String() + ".png"
        f, err := os.Create(newName)

        if err != nil {
            log.Println(err)
        }

        image  = strings.Split(f.Name(), "/")[1]
        jpeg.Encode(f, im, nil)

    }
        return image
}
